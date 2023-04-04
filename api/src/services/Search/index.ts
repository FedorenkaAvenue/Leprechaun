import { Injectable } from '@nestjs/common';
import { SearchRequest, SearchTotalHits } from '@elastic/elasticsearch/lib/api/types';

import ProductService from '@services/Product';
import { SEService } from '@services/SE';
import { SearchResI } from '@interfaces/Search';
import CategoryService from '@services/Category';

@Injectable()
export default class SearchService {
    constructor(
        protected readonly SEService: SEService,
        protected readonly productService: ProductService,
        protected readonly categoryService: CategoryService,
    ) {}

    /**
     * @description get data from SE | get documents IDs | get data from DB by IDs
     * @param substring searchible string
     * @param index SE index
     * @param fetchDBFunc method to get data from DB
     * @returns {SearchResI} result
     */
    protected async getSearchData<D extends { id: number | string }, E>(
        SESearchReq: SearchRequest, fetchDBFunc: (ids: unknown[]) => Promise<E[]>
    ): Promise<SearchResI<E>> {
        const { hits: { total, hits } } = await this.SEService.SE.search<D>(SESearchReq);

        if (!(total as SearchTotalHits).value) return { hits: null, total: 0 };

        const res = await fetchDBFunc(hits.map(({ _source }) => _source.id));

        return {
            hits: res,
            total: (total as SearchTotalHits).value,
        };
    }
}
