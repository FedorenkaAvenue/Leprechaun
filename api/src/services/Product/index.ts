import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsOrder, In, Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { FSService } from '@services/FS';
import { ProductEntity } from '@entities/Product';
import { ImageService } from '@services/Image';
import { PaginationResult } from '@dto/Pagination/constructor';
import { QueriesProductList } from '@dto/Queries/constructor';
import HistoryPublicService from '@services/History/public';
import { ProductI } from '@interfaces/Product';
import { SortProductE } from '@enums/Query';
import { PropertyGroupEntity } from '@entities/PropertGroup';
import { SEService } from '@services/SE';
import LoggerService from '@services/Logger';

@Injectable()
export default class ProductService {
    constructor(
        @InjectRepository(ProductEntity) protected readonly productRepo: Repository<ProductEntity>,
        protected readonly imageService: ImageService,
        protected readonly historyService: HistoryPublicService,
        protected readonly FSService: FSService,
        protected readonly SEService: SEService,
        private readonly loggerService: LoggerService,
    ) {}

    /**
     * @description get common product query builder
     * @returns query builder
     */
    protected getProductQueryBulder(): SelectQueryBuilder<ProductEntity> {
        return this.productRepo
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.title', 'title')
            .leftJoinAndSelect('p.images', 'images')

            .leftJoin('p.properties', 't_props')
            .leftJoin('t_props.propertygroup', 't_pg')

            .leftJoinAndMapMany('p.options', PropertyGroupEntity, 'pg', 't_pg.id = pg.id')
            .leftJoinAndSelect('pg.title', 'pg_title')

            .leftJoinAndSelect('pg.properties', 'props', 't_props.id = props.id')
            .leftJoinAndSelect('props.title', 'props_title');
    }

    /**
     * @description get product list by criteria
     * @param {FindManyOptions<ProductEntity>} options search criteria option
     * @returns array of ProductEntity
     */
    public async getProductListByCriteria(options: FindManyOptions<ProductEntity>): Promise<ProductEntity[]> {
        return await this.productRepo.find(options);
    }

    /**
     * @description change "new" entity field
     */
    public async changeNewStatus(): Promise<void> {
        const { affected } = await this.productRepo.update({ is_new: true }, { is_new: false });

        this.loggerService.info(`${affected} products was changed to is_new = false`);
    }

    /**
     * @description update (increment) product.orderCount field
     * @param id product ID
     */
    public async incrementProductOrderCount(id: ProductI['id']): Promise<void> {
        const { orderCount } = await this.productRepo.findOneBy({ id });

        await this.productRepo.update({ id }, { orderCount: orderCount + 1 });
    }

    /**
     * @description render product search result with filters, sorting and pagination
     * @param qb query builder to continue building query
     * @param searchParams
     * @param resultMapConstructor constructor for maping result. by default will return ProductEntity
     * @returns completed search result with pagination
     */
    protected async renderProductList<T>(
        qb: SelectQueryBuilder<ProductEntity>,
        searchParams: QueriesProductList,
        resultMapConstructor?: any,
    ): Promise<PaginationResult<T>> {
        const {
            sort, portion, page, dynamicFilters,
            commonFilters: { status, price },
        } = searchParams;

        // filtering by dinamical filters
        if (dynamicFilters) {
            console.log(Object.values(dynamicFilters));
            
                qb
                    .andWhere('p.properties.alt_name = bavovna', { propGroup: Object.values(dynamicFilters) })
                    // .andWhere('props.alt_name IN(:...props)', { props: dynamicFilters[propGroup] });
        }

        // price
        if (price) qb.andWhere('p.price.current BETWEEN :min AND :max', { ...price });

        // product status
        qb.andWhere('p.status = :status', { status });

        // sorting
        switch (sort) {
            case SortProductE.PRICE_UP: {
                qb.orderBy('p.price.current', 'ASC');
                break;
            }

            case SortProductE.PRICE_DOWN: {
                qb.orderBy('p.price.current', 'DESC');
                break;
            }

            case SortProductE.NEW: {
                qb.orderBy('p.created_at', 'DESC');
                break;
            }

            default: // CookieSortType.POPULAR
                qb.orderBy('p.rating', 'DESC');
        }

        const [result, resCount] = await qb
            .take(portion)
            .skip((page - 1) * portion)
            .getManyAndCount();

        return new PaginationResult<T>(
            resultMapConstructor ? result.map(prod => new resultMapConstructor(prod, searchParams)) : result,
            {
                currentPage: page,
                totalCount: resCount,
                itemPortion: portion,
            },
        );
    }
}
