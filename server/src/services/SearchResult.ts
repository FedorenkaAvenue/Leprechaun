import { SelectQueryBuilder } from "typeorm";

import { ProductEntity } from "@modules/product/index.entity";
import { ISearchReqQueries } from "@interface/Queries";
import { ICookies } from "@interface/Cookies";
import { SearchQueriesDTO } from "@dto/SearchQueries";
import { CookieDTO } from "@dto/Cookies";
import { SearchResultDTO } from "@dto/SearchResult";

/**
 * @description create search result with parsing queries and pagination
 */
export class SearchResultService {
    /**
     * @description continue rendering search result
     * @param qb partial query builder
     * @param queries url queries
     * @param cookies request cookies
     */
    async renderResult(
        qb: SelectQueryBuilder<ProductEntity>,
        queries: ISearchReqQueries,
        cookies: ICookies
    ): Promise<SearchResultDTO> {
        const { page, price, filters } = new SearchQueriesDTO(queries);
		const { portion, sort } = new CookieDTO(cookies);

        // if (filters) qb.having('product.properties IN (:...filters)', { filters });
		if (price) qb.andWhere('product.price >= :from AND product.price <= :to', { ...price });

		const [ result, resCount ] = await qb
			.take(portion)
			.skip((page - 1) * portion)
			.getManyAndCount();

		return new SearchResultDTO(
			result.map(({ properties, ...product }) => ({
				...product,
				properties: properties.map(({ filterGroup, ...prop }) => ({
					prop: filterGroup,
					val: prop
				}))
			})),
			{
				currentPage: page,
				totalCount: resCount,
				itemPortion: portion
			}
		);
    }
}
