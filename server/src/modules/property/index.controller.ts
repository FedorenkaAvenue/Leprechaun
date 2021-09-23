import { Body, Controller, Delete, Get, Param, Post, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";

import { CreatePropertyDTO, CreatePropertyGroupDTO } from "./index.dto";
import { PropertyBaseEntity, PropertyEntity, ProductGroupBaseEntity, PropertyGroupEntity } from "./index.entity";
import { PropertyGroupService, PropertyService } from "./index.service";
import { AffectedInterceptor, NotFoundInterceptor } from "@interceptors/DB";

@Controller('propertygroup')
@ApiTags('Property group')
export class PropertyGroupController {
    constructor(private readonly propertyGroupService: PropertyGroupService) {}

    @Post()
    @ApiOperation({ summary: 'add new property group' })
    @ApiOkResponse({ type: ProductGroupBaseEntity })
    createGroup(@Body(new ValidationPipe({ transform: true })) group: CreatePropertyGroupDTO): Promise<ProductGroupBaseEntity> {
        return this.propertyGroupService.createGroup(group);
    }

    @Get('list')
    @ApiOperation({ summary: 'get all property groups' })
    @ApiOkResponse({ type: ProductGroupBaseEntity, isArray: true })
    getAllGroups(): Promise<PropertyGroupEntity[]> {
        return this.propertyGroupService.getAllGroups();
    }

    @Get(':groupId')
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get property group (with properties)' })
    @ApiOkResponse({ type: PropertyGroupEntity })
    getGroup(@Param('groupId') groupId: number): Promise<PropertyGroupEntity> {
        return this.propertyGroupService.getGroup(groupId);
    }

    @Delete(':groupId')
    @UseInterceptors(AffectedInterceptor)
    @ApiOperation({ summary: 'delete property group by ID' })
    deleteGroup(@Param('groupId') groupId: number): Promise<DeleteResult> {
        return this.propertyGroupService.deleteGroup(groupId);
    }
}

@Controller('property')
@ApiTags('Property')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) {}

    @Post()
    @ApiOperation({ summary: 'add new property' })
    @ApiOkResponse({ type: PropertyBaseEntity })
    createFilter(@Body(new ValidationPipe({ transform: true })) filter: CreatePropertyDTO): Promise<PropertyEntity> {
        return this.propertyService.createFilter(filter);
    }

    @Get(':filterId')
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get property by ID' })
    @ApiOkResponse({ type: PropertyBaseEntity })
    getGroup(@Param('filterId') filterId: number): Promise<PropertyEntity> {
        return this.propertyService.getFilter(filterId);
    }

    @Delete(':filterId')
    @UseInterceptors(AffectedInterceptor)
    @ApiOperation({ summary: 'delete property by ID' })
    deleteGroup(@Param('filterId') filterId: number): Promise<DeleteResult> {
        return this.propertyService.deletefilter(filterId);
    }
}
