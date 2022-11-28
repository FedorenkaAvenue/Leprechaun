import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { FSService } from '@services/FS';
import { ProductEntity } from '@entities/Product';
import { ImageService } from '@services/Image';
import { PaginationResultDTO } from '@dto/Pagination';
import { Queries } from '@dto/Queries/constructor';
import HistoryPublicService from '@services/History/public';
import WishlistItemEntity from '@entities/WishlistItem';
import { ProductI } from '@interfaces/Product';
import { SortProductE } from '@enums/Query';
import { PaginationResult } from '@dto/Pagination/constructor';
import logger from '@services/Logger';

@Injectable()
export default class ProductService {
    constructor(
        @InjectRepository(ProductEntity) protected readonly productRepo: Repository<ProductEntity>,
        protected readonly imageService: ImageService,
        protected readonly historyService: HistoryPublicService,
        protected readonly FSService: FSService,
    ) {}

    /**
     * @description get product by ID
     * @param {String} id product ID
     * @returns product entity
     */
    async getProductById(id: ProductI['id']): Promise<ProductEntity> {
        const qb = this.getProductQueryBulder();

        qb.leftJoinAndSelect('product.category', 'category')
            .where('product.is_public = true')
            .andWhere('product.id = :id', { id })
            .leftJoinAndMapMany('product.wishlistCount', WishlistItemEntity, 'w', 'w.product.id = product.id');

        try {
            return await qb.getOneOrFail();
        } catch (err) {
            throw new NotFoundException('product not found');
        }
    }

    /**
     * @description get product list by criteria
     * @param {FindOptionsOrder<ProductEntity>} order order criteria
     * @param {Number} take amount of item
     * @returns array of ProductEntity
     */
    async getProductListByCriteria(order: FindOptionsOrder<ProductEntity>, take?: number): Promise<ProductEntity[]> {
        return await this.productRepo.find({
            where: { is_public: true },
            take,
            order,
        });
    }

    /**
     * @description change "new" entity field
     */
    async changeNewStatus(): Promise<void> {
        const { affected } = await this.productRepo.update({ is_new: true }, { is_new: false });

        logger.info(`${affected} products was changed to is_new = false`);
    }

    /**
     * @description get common product query builder
     * @returns query builder
     */
    getProductQueryBulder(): SelectQueryBuilder<ProductEntity> {
        return this.productRepo
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.properties', 'properties')
            .leftJoinAndSelect('product.images', 'images')
            .leftJoinAndSelect('properties.property_group', 'property_group');
    }

    /**
     * @description render product search result with filters, sorting and pagination
     * @param qb query builder to continue building query
     * @param searchParams
     * @param resultMapConstructor constructor for maping result. by default will return ProductEntity
     * @returns completed search result with pagination
     */
    async renderResult<T>(
        qb: SelectQueryBuilder<ProductEntity>,
        searchParams: Queries,
        resultMapConstructor?: any,
    ): Promise<PaginationResultDTO<T>> {
        const { status, dinamicFilters, sort, price, portion, page } = searchParams;

        // filtering by dinamical filters
        if (dinamicFilters) {
            const props = Object.keys(dinamicFilters);
            const values = Object.values(dinamicFilters);

            // ? на будущее переделать в subQuery
            qb.andWhere(
                `product.id = ANY(
                    SELECT product_id as p_id
                    FROM _products_to_properties
                    INNER JOIN property AS prop ON prop.id = _products_to_properties.property_id
                    INNER JOIN property_group AS prop_gr ON prop.property_group = prop_gr.id
                    WHERE property_id IN (:...values)
                    AND prop_gr.alt_name IN(:...props)
                    GROUP BY p_id
                    HAVING COUNT(*) = :filterLen
                )`,
                {
                    props,
                    values,
                    filterLen: props.length,
                },
            );
        }

        // price
        if (price) qb.andWhere('product.price BETWEEN :from AND :to', { ...price });

        // product status
        qb.andWhere('product.status = :status', { status });

        // sorting
        switch (sort) {
            case SortProductE.PRICE_UP: {
                qb.orderBy('product.price.current', 'ASC');
                break;
            }

            case SortProductE.PRICE_DOWN: {
                qb.orderBy('product.price.current', 'DESC');
                break;
            }

            case SortProductE.NEW: {
                qb.orderBy('product.created_at', 'DESC');
                break;
            }

            default: // CookieSortType.POPULAR
                qb.orderBy('product.rating', 'DESC');
        }

        const [result, resCount] = await qb
            .take(portion)
            .skip((page - 1) * portion)
            .getManyAndCount();

        return new PaginationResult<T>(
            resultMapConstructor ? result.map(prod => new resultMapConstructor(prod)) : result,
            {
                currentPage: page,
                totalCount: resCount,
                itemPortion: portion,
            },
        );
    }
}
