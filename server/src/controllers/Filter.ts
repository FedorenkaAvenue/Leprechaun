import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FilterService } from '@services/Filter';
import { IFilterGroup } from '@interfaces/Filter';
import { FilterGroupEntitry } from '@entities/Filter';

@Controller('filter')
@ApiTags('Filter')
export class FilterController {
    constructor(private readonly filterService: FilterService) {}

    @Get(':categoryUrl')
    @ApiOperation({ summary: 'get filters for category' })
    @ApiOkResponse({ type: FilterGroupEntitry, isArray: true })
    getCategoryFilters(
        @Param('categoryUrl') categoryUrl: string,
        @Query() queries: any
    ): Promise<IFilterGroup[]> {
        return this.filterService.getCategoryFilters(categoryUrl, queries);
    }
}
