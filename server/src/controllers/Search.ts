import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SearchService } from '@services/Search';
import { ProductEntity } from '@entities/Product';

@Controller('search')
@ApiTags('Search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get('/product/:exp')
    // @UseInterceptors(PaginationEmptyInterceptor)
    @ApiOperation({ summary: 'get products by search string' })
    @ApiOkResponse({ type: ProductEntity, isArray: true })
    searchByString(@Param('exp') searchExp: string) {
        return this.searchService.searchProductsByString(searchExp);
    }
}
