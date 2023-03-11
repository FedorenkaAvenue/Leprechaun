import { CacheInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import FilterPublicService from '@services/Filter/public';
import Queries from '@decorators/Query';
import { QueriesCommon } from '@dto/Queries/constructor';

@Controller('filters')
@ApiTags('Filters 🧑‍💻')
export default class FilterPublicController {
    constructor(private readonly filterService: FilterPublicService) {}

    @Get('category/:categoryUrl')
    @UseInterceptors(CacheInterceptor)
    @ApiOperation({ summary: `get filters for category (by category URL)` })
    @ApiOkResponse({})
    getCategoryFilters(@Param('categoryUrl') categoryUrl: string, @Queries(QueriesCommon) queries: QueriesCommon) {
        return this.filterService.getCategoryFilters(categoryUrl, queries);
    }
}
