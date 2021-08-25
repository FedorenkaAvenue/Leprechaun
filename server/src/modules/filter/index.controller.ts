import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";

import { CreateFilterDTO, CreateFilterGroupDTO } from "./index.dto";
import { FilterBaseEntity, FilterEntity, FilterGroupBaseEntity, FilterGroupEntity } from "./index.entity";
import { FilterGroupService, FilterService } from "./index.service";
import { AffectedInterceptor, NotFoundInterceptor } from "@interceptors/DB";

@Controller('filtergroup')
@ApiTags('Filter group')
export class FilterGroupController {
    constructor(private readonly filtergroupService: FilterGroupService) {}

    @Post()
    @ApiOperation({ summary: 'add new filter group' })
    @ApiOkResponse({ type: FilterGroupBaseEntity })
    createGroup(@Body() group: CreateFilterGroupDTO): Promise<FilterGroupBaseEntity> {
        return this.filtergroupService.createGroup(group);
    }

    @Get('list')
    @ApiOperation({ summary: 'get all filter groups' })
    @ApiOkResponse({ type: FilterGroupBaseEntity, isArray: true })
    getAllGroups(): Promise<FilterGroupEntity[]> {
        return this.filtergroupService.getAllGroups();
    }

    @Get(':groupId')
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get filter group (with filters)' })
    @ApiOkResponse({ type: FilterGroupEntity })
    getGroup(@Param('groupId') groupId: number): Promise<FilterGroupEntity> {
        return this.filtergroupService.getGroup(groupId);
    }

    @Delete(':groupId')
    @UseInterceptors(AffectedInterceptor)
    @ApiOperation({ summary: 'delete filter group by ID' })
    deleteGroup(@Param('groupId') groupId: number): Promise<DeleteResult> {
        return this.filtergroupService.deleteGroup(groupId);
    }
}

@Controller('filter')
@ApiTags('Filter')
export class FilterController {
    constructor(private readonly filterService: FilterService) {}

    @Post()
    @ApiOperation({ summary: 'add new filter' })
    @ApiOkResponse({ type: FilterBaseEntity })
    createFilter(@Body() filter: CreateFilterDTO): Promise<FilterEntity> {
        return this.filterService.createFilter(filter);
    }

    @Get(':filterId')
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get filter by ID' })
    @ApiOkResponse({ type: FilterBaseEntity })
    getGroup(@Param('filterId') filterId: number): Promise<FilterEntity> {
        return this.filterService.getFilter(filterId);
    }

    @Delete(':filterId')
    @UseInterceptors(AffectedInterceptor)
    @ApiOperation({ summary: 'delete filter by ID' })
    deleteGroup(@Param('filterId') filterId: number): Promise<DeleteResult> {
        return this.filterService.deletefilter(filterId);
    }
}
