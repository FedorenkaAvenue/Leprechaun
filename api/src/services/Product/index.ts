import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { FSService } from '@services/FS';
import { ProductEntity } from '@entities/Product';
import { ImageService } from '@services/Image';
import { PaginationResult } from '@dto/Pagination';
import { QueriesProductList } from '@dto/Queries';
import { ProductSort } from '@enums/Query';
import { PropertyGroupEntity } from '@entities/PropertGroup';
import LoggerService from '@services/Logger';

@Injectable()
export default class ProductService {
    constructor(
        @InjectRepository(ProductEntity) protected readonly productRepo: Repository<ProductEntity>,
        protected readonly imageService: ImageService,
        protected readonly FSService: FSService,
        private readonly loggerService: LoggerService,
    ) { }

    /**
     * @description change "new" entity field
     */
    public async changeNewStatus(): Promise<void> {
        const { affected } = await this.productRepo.update({ is_new: true }, { is_new: false });

        this.loggerService.info(`${affected} products was changed to is_new = false`);
    }

    /**
     * @description get common product query builder
     * @returns query builder
     */
    protected getProductQueryBulder(): SelectQueryBuilder<ProductEntity> {
        return this.productRepo
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.title', 'title')
            .leftJoinAndSelect('p.images', 'images')
            .leftJoinAndSelect('p.description', 'description')

            .leftJoin('p.properties', 't_props')
            .leftJoin('t_props.propertygroup', 't_pg')

            .leftJoinAndMapMany('p.options', PropertyGroupEntity, 'pg', 't_pg.id = pg.id')
            .leftJoinAndSelect('pg.title', 'pg_title')

            .leftJoinAndSelect('pg.properties', 'props', 't_props.id = props.id')
            .leftJoinAndSelect('props.title', 'props_title');
    }

    /**
     * @description render product search result with filters, sorting and pagination
     * @param qb query builder to continue building query
     * @param searchParams
     * @param resultMapConstructor constructor for maping result. by default will return ProductEntity
     * @param isPublic get only pablic data
     * @returns completed search result with pagination
     */
    protected async renderProductList<T>(
        qb: SelectQueryBuilder<ProductEntity>,
        searchParams: QueriesProductList,
        isPublic: boolean,
        resultMapConstructor: { new(res: ProductEntity, searchParams?: QueriesProductList): T }
    ): Promise<PaginationResult<T>>;

    protected async renderProductList(
        qb: SelectQueryBuilder<ProductEntity>,
        searchParams: QueriesProductList,
        isPublic: boolean
    ): Promise<PaginationResult<ProductEntity>>;

    protected async renderProductList<T = ProductEntity>(
        qb: SelectQueryBuilder<ProductEntity>,
        searchParams: QueriesProductList,
        isPublic: boolean,
        resultMapConstructor?: { new(res: ProductEntity, searchParams?: QueriesProductList): T }
    ): Promise<PaginationResult<T>> {
        const { sort, portion, page, price, status, category, optionsFilter } = searchParams;

        if (optionsFilter) {
            qb.andWhere('p.properties.alt_name = :value', { value: 'bavovna' }); // Example filter logic
        }

        if (price) qb.andWhere('p.price.current BETWEEN :min AND :max', { ...price });

        if (category) {
            qb.leftJoin('p.category', 'cat').where('cat.id = :categoryId', { categoryId: category });

            if (isPublic) qb.andWhere('cat.is_public = true');
        }

        if (status) qb.andWhere('p.status = :status', { status });

        switch (sort) {
            case ProductSort.PRICE_UP:
                qb.orderBy('p.price.current', 'ASC');
                break;
            case ProductSort.PRICE_DOWN:
                qb.orderBy('p.price.current', 'DESC');
                break;
            case ProductSort.NEW:
                qb.orderBy('p.created_at', 'DESC');
                break;
            default: // ProductSort.POPULAR
                qb.orderBy('p.rating', 'DESC');
        }

        if (isPublic) qb.andWhere('p.is_public = true');

        const [result, resCount] = await qb
            .take(portion)
            .skip((page - 1) * portion)
            .getManyAndCount();

        const mappedResult = resultMapConstructor
            ? result.map(product => new resultMapConstructor(product, searchParams))
            : (result as T[]);

        return new PaginationResult<T>(mappedResult, {
            currentPage: page,
            totalCount: resCount,
            itemPortion: portion,
        });
    }

}
