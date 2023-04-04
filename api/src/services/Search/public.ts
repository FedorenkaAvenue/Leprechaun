import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import SearchService from '.';
import { QueriesSearch } from '@dto/Queries/constructor';
import { SearchAutocomplete } from '@dto/Search/constructor';
import { SECategoryI, SEProductI } from '@interfaces/SE';
import { ProductEntity } from '@entities/Product';
import { SEIndexesE } from '@enums/SE';
import { CategoryEntity } from '@entities/Category';
import { ProductI } from '@interfaces/Product';
import { CategoryI } from '@interfaces/Category';

@Injectable()
export default class SearchPublicService extends SearchService {
    public async autocomplete({ substring, lang }: QueriesSearch): Promise<SearchAutocomplete> {
        const [products, categories] = await Promise.all([
            this.getSearchData<SEProductI, ProductEntity>(
                {
                    index: SEIndexesE.PRODUCT,
                    query: {
                        query_string: {
                            query: `*${substring}*`,
                        },
                    },
                },
                (ids: Array<ProductI['id']>) => this.productService.getProductListByCriteria({
                    where: { is_public: true, id: In(ids) },
                    take: 5,
                })
            ),
            this.getSearchData<SECategoryI, CategoryEntity>(
                {
                    index: SEIndexesE.CATEGORY,
                    query: {
                        query_string: {
                            query: `*${substring}*`,
                        },
                    },
                },
                (ids: Array<CategoryI['id']>) => this.categoryService.getCategoryListByCriteria({
                    where: { is_public: true, id: In(ids) },
                    take: 3,
                })
            ),
        ]);

        return new SearchAutocomplete({ products, categories }, lang);
    }
}
