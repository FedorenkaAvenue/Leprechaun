import { ApiProperty } from '@nestjs/swagger';
import { AggregationsAggregate, SearchResponse, SearchTotalHits } from '@elastic/elasticsearch/lib/api/types';

import { ProductSearch } from '@dto/Product/constructor';
import { CategorySearch } from '@dto/Category/constructor';
import { SearchAutocompleteI } from '@interfaces/Search';
import { SECategoryI, SEProductI } from '@interfaces/SE';
import { QueriesSearch } from '@dto/Queries/constructor';

interface SearchAutocompleteDTO {
    products: SearchResponse<SEProductI, Record<string, AggregationsAggregate>>
    categories: SearchResponse<SECategoryI, Record<string, AggregationsAggregate>>
}

export class SearchAutocomplete implements SearchAutocompleteI {
    @ApiProperty({ description: 'total finded results' })
    total: number;

    @ApiProperty({ type: ProductSearch, isArray: true })
    products: ProductSearch[];

    @ApiProperty({ type: CategorySearch, isArray: true })
    categories: CategorySearch[];

    constructor({ products, categories }: SearchAutocompleteDTO, lang: QueriesSearch['lang']) {
        this.total = (products.hits.total as SearchTotalHits).value + (categories.hits.total as SearchTotalHits).value;
        //@ts-ignore
        this.products = products.hits.hits.map(({ _source }) => new ProductSearch(_source, lang));
        //@ts-ignore
        this.categories = categories.hits.hits.map(({ _source }) => new CategorySearch(_source, lang));
    }
}
