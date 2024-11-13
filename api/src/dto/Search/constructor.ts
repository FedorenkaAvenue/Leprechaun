import { ApiProperty } from '@nestjs/swagger';

import { ProductPreview } from '@dto/Product/constructor';
import { SearchAutocompleteI, SearchResI } from '@interfaces/Search';
import { QueriesSearch } from '@dto/Queries/constructor';
import { ProductEntity } from '@entities/Product';
import { CategoryEntity } from '@entities/Category';
import { CategoryPublicI } from '@interfaces/Category';
import { CategoryPublic } from '@dto/Category/constructor';
import { ProductPreviewPublicI } from '@interfaces/Product';

interface SearchAutocompleteDTO {
    products: SearchResI<ProductEntity>
    categories: SearchResI<CategoryEntity>
}

export class SearchAutocomplete implements SearchAutocompleteI {
    @ApiProperty({ description: 'total finded results' })
    total: number;

    @ApiProperty({ type: CategoryPublic, isArray: true })
    categories: CategoryPublicI[];

    @ApiProperty({ type: ProductPreview, isArray: true })
    products: ProductPreviewPublicI[];

    constructor({ products, categories }: SearchAutocompleteDTO, lang: QueriesSearch['lang']) {
        this.total = products.total + categories.total;
        this.categories = categories.hits?.map(cat => new CategoryPublic(cat, lang));
        this.products = products.hits?.map(prod => new ProductPreview(prod, lang));
    }
}
