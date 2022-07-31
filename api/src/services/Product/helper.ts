import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { ProductEntity } from '@entities/Product';
import { FSService } from '@services/FS';
import { ImageService } from '@services/Image';
import { ICookies } from '@interfaces/Cookies';
import { ISearchReqQueries } from '@interfaces/Queries';
import { SortType } from '@enums/Query';
import { PaginationResultDTO } from '@dto/Pagination';
import ConfigService from '../Config';
import { PaginationResult } from '@dto/Pagination/constructor';
import { SearchQueries } from '@dto/Queries/constructor';

@Injectable()
export default class ProductHelperService {
    dashboardPortion: number;

    constructor(
		@InjectRepository(ProductEntity) protected readonly productRepo: Repository<ProductEntity>,
		protected readonly FSService: FSService,
		protected readonly imageService: ImageService,
		protected readonly configService: ConfigService
	) {
		this.dashboardPortion = +this.configService.getVal('DASHBOARD_PORTION');
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
	 * @param qb current query builder to continue building query
	 * @param queries
	 * @param cookies
	 * @param resultMapConstructor constructor for maping result
	 * @returns completed search result with pagination
	 */
	async renderResult<T>(
        qb: SelectQueryBuilder<ProductEntity>,
        queries: ISearchReqQueries,
        params: ICookies,
		resultMapConstructor?: any
    ): Promise<PaginationResultDTO<T>> {
        const { sort, page, price, status, dinamicFilters } = new SearchQueries(queries);
		const { portion } = params;

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
				)`, {
					props, values,
					filterLen: props.length
				}
			);
		}

		// filtering by price
		if (price) qb.andWhere('product.price BETWEEN :from AND :to', { ...price });

		// filtering by sell status
		if (typeof status) qb.andWhere('product.status = :status', { status });
		
		// sorting
		switch (sort) {
			case SortType.PRICE_UP: {
				qb.orderBy('product.price.current', 'ASC');
				break;
			}

			case SortType.PRICE_DOWN: {
				qb.orderBy('product.price.current', 'DESC');
				break;
			}

			case SortType.NEW: {
				qb.orderBy('product.created_at', 'DESC');
				break;
			}

			default: // CookieSortType.POPULAR
				qb.orderBy('product.rating', 'DESC');
		}

		const [ result, resCount ] = await qb
			.take(portion)
			.skip((page - 1) * portion)
			.getManyAndCount();
		
		return new PaginationResult<T>(
			resultMapConstructor ?
				result.map(prod => new resultMapConstructor(prod)) :
				result,
			{
				currentPage: page,
				totalCount: resCount,
				itemPortion: portion
			}
		);
    }
}
