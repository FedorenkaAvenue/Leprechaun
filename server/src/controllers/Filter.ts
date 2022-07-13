import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FilterService } from '@services/Filter';
import { FiltersDTO } from '@dto/Filter';
import { ISearchReqQueries } from '@interfaces/Queries';

@Controller('filter')
@ApiTags('Filter 🤵🏿‍♂️')
export class FilterController {
    constructor(private readonly filterService: FilterService) {}

    @Get(':categoryUrl')
    @ApiOperation({ summary: 'get filters for category' })
    @ApiOkResponse({ type: FiltersDTO })
    @ApiNotFoundResponse({ description: 'category not found' })
    getCategoryFilters(
        @Param('categoryUrl') categoryUrl: string,
        @Query() queries: ISearchReqQueries
    ): Promise<FiltersDTO> {
        return this.filterService.getCategoryFilters(categoryUrl, queries);
    }
}
