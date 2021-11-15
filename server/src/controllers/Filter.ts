import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FilterService } from '@services/Filter';
import { PropertyGroupEntity } from '@entities/PropertGroup';
import { IPropertyGroup } from '@interfaces/PropertyGroup';

@Controller('filter')
@ApiTags('Filter')
export class FilterController {
    constructor(private readonly filterService: FilterService) {}

    @Get(':categoryUrl')
    @ApiOperation({ summary: 'get filters for category' })
    @ApiOkResponse({ type: PropertyGroupEntity, isArray: true })
    getCategoryFilters(
        @Param('categoryUrl') categoryUrl: string,
        @Query() queries: any
    ): Promise<IPropertyGroup[]> {
        return this.filterService.getCategoryFilters(categoryUrl, queries);
    }
}
