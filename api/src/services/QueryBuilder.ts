import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';

import { Queries } from '@dto/Queries/constructor';
import { ProductEntity } from '@entities/Product';
import { SortProductE } from '@enums/Query';
import { PaginationResultDTO } from '@dto/Pagination';
import { PaginationResult } from '@dto/Pagination/constructor';

/**
 * @description по задумке должен так же использоваться в других модулях. но хуй знает
 */
@Injectable()
export default class QueryBuilderService {
    /**
     * @description query builder with filtering by sell status
     * @param qb current query builder to continue building query
     * @param dinamicFilters dinamic filters
     */
    qbWithDinamicFilters(this: SelectQueryBuilder<ProductEntity>, dinamicFilters: Queries['dinamicFilters']): void {
        const props = Object.keys(dinamicFilters);
        const values = Object.values(dinamicFilters);

        // ? на будущее переделать в subQuery
        this.andWhere(
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

    /**
     * @description query builder with filtering by sell status
     * @param qb current query builder to continue building query
     * @param status status search data
     */
    qbWithSellStatus(this: SelectQueryBuilder<ProductEntity>, status: Queries['status']): void {
        this.andWhere('product.status = :status', { status });
    }

    /**
     * @description query builder with price filter query
     * @param qb current query builder to continue building query
     * @param price price search data
     */
    qbWithPrice(this: SelectQueryBuilder<ProductEntity>, price: Queries['price']): void {
        this.andWhere('product.price BETWEEN :from AND :to', { ...price });
    }

    /**
     * @description query builder with sorting query
     * @param qb current query builder to continue building query
     * @param sort sorting search data
     */
    qbWithSorting(this: SelectQueryBuilder<ProductEntity>, sort: Queries['sort']): void {
        switch (sort) {
            case SortProductE.PRICE_UP: {
                this.orderBy('product.price.current', 'ASC');
                break;
            }

            case SortProductE.PRICE_DOWN: {
                this.orderBy('product.price.current', 'DESC');
                break;
            }

            case SortProductE.NEW: {
                this.orderBy('product.created_at', 'DESC');
                break;
            }

            default: // CookieSortType.POPULAR
                this.orderBy('product.rating', 'DESC');
        }
    }

    /**
     * @description render QB result with pagination
     * @param this query builder
     * @param param1 search params
     * @param resultMapConstructor constructor for maping result
     * @returns completed search result with pagination
     */
    async qbWithPagination<E, C>(
        this: SelectQueryBuilder<E>,
        { portion, page }: Queries,
        resultMapConstructor?: any,
    ): Promise<PaginationResultDTO<C>> {
        const [result, resCount] = await this.take(portion)
            .skip((page - 1) * portion)
            .getManyAndCount();

        return new PaginationResult<C>(
            resultMapConstructor ? result.map(prod => new resultMapConstructor(prod)) : result,
            {
                currentPage: page,
                totalCount: resCount,
                itemPortion: portion,
            },
        );
    }
}
