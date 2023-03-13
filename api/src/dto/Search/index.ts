import { ApiProperty } from '@nestjs/swagger';

import { SearchAutocompleteI } from '@interfaces/Search';
import { ProductSearch } from '@dto/Product/constructor';
import { CategorySearch } from '@dto/Category/constructor';

export class SearchAutocompleteDTO implements SearchAutocompleteI {
    @ApiProperty({ description: 'total finded results' })
    total: number;

    @ApiProperty({ type: ProductSearch, isArray: true })
    products: ProductSearch[];

    @ApiProperty({ type: CategorySearch, isArray: true })
    categories: CategorySearch[];
}
