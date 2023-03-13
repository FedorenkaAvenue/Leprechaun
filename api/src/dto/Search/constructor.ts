import { ProductSearch } from '@dto/Product/constructor';
import { SearchAutocompleteDTO } from '.';
import { CategorySearch } from '@dto/Category/constructor';

export class SearchAutocomplete extends SearchAutocompleteDTO {
    constructor({ products, categories }) {
        super();
        this.total = products.hits.total + categories.hits.total;
        this.products = products.hits.hits.map(({ _source }) => new ProductSearch(_source));
        this.categories = categories.hits.hits.map(({ _source }) => new CategorySearch(_source));
    }
}
