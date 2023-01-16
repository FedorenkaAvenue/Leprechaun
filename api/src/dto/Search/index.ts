import { ApiProperty } from '@nestjs/swagger';

import { SearchAutocompleteI, SearchCategoryItemT, SearchProductItemT } from '@interfaces/Search';
import { ProductI } from '@interfaces/Product';
import { CategoryI } from '@interfaces/Category';

export class SearchProductItemDTO implements SearchProductItemT {
    @ApiProperty({ type: 'string' })
    id: ProductI['id'];

    @ApiProperty({ type: 'string' })
    title: ProductI['title'];
}

export class SearchCategoryItemDTO implements SearchCategoryItemT {
    @ApiProperty({ type: 'string' })
    url: CategoryI['url'];

    @ApiProperty({ type: 'string' })
    title: CategoryI['title'];
}

export class SearchAutocompleteDTO implements SearchAutocompleteI {
    @ApiProperty({ description: 'total finded results' })
    total: number;

    @ApiProperty({ type: SearchProductItemDTO, isArray: true })
    products: SearchProductItemDTO[];

    @ApiProperty({ type: SearchCategoryItemDTO, isArray: true })
    categories: SearchCategoryItemDTO[];
}
