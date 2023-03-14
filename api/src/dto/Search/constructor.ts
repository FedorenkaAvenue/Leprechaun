import { ApiProperty } from '@nestjs/swagger';

import { ProductSearch } from '@dto/Product/constructor';
import { CategorySearch } from '@dto/Category/constructor';
import { SearchAutocompleteI } from '@interfaces/Search';

export class SearchAutocomplete implements SearchAutocompleteI {
    @ApiProperty({ description: 'total finded results' })
    total: number;

    @ApiProperty({ type: ProductSearch, isArray: true })
    products: ProductSearch[];

    @ApiProperty({ type: CategorySearch, isArray: true })
    categories: CategorySearch[];

    constructor({ products, categories }) {
        this.total = products.hits.total + categories.hits.total;
        this.products = products.hits.hits.map(({ _source }) => new ProductSearch(_source));
        this.categories = categories.hits.hits.map(({ _source }) => new CategorySearch(_source));
    }
}
