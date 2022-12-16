import { SearchAutocompleteDTO, SearchCategoryItemDTO, SearchProductItemDTO } from '.';

export class SearchProductItem extends SearchProductItemDTO {
    constructor({ p_id, title }) {
        super();
        this.id = p_id;
        this.title = title;
    }
}

export class SearchCategoryItem extends SearchCategoryItemDTO {
    constructor({ url, title }) {
        super();
        this.url = url;
        this.title = title;
    }
}

export class SearchAutocomplete extends SearchAutocompleteDTO {
    constructor({ products, categories }) {
        super();
        this.total = products.hits.total + categories.hits.total;
        this.products = products.hits.hits.map(({ _source }) => new SearchProductItem(_source));
        this.categories = categories.hits.hits.map(({ _source }) => new SearchCategoryItem(_source));
    }
}
