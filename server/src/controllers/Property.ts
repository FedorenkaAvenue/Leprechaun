import { Body, Controller, Delete, Get, Param, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { CreatePropertyDTO, CreatePropertyGroupDTO } from '@dto/Property';
import { PropertyBaseEntity, PropertyEntity, ProductGroupBaseEntity, PropertyGroupEntity } from '@entities/Property';
import { PropertyGroupService, PropertyService } from '@services/Property';
import { AffectedInterceptor, NotFoundInterceptor } from '@interceptors/responce';

@Controller('propertygroup')
@ApiTags('Property group')
export class PropertyGroupController {
    constructor(private readonly propertyGroupService: PropertyGroupService) {}

    @Post()
    @ApiOperation({ summary: 'add new property group' })
    @ApiOkResponse({ description : 'success' })
    createGroup(@Body(new ValidationPipe({ transform: true })) group: CreatePropertyGroupDTO): Promise<void> {
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
    @ApiOperation({ summary: 'get property group by ID' })
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
    @ApiOkResponse({ description: 'success' })
    createProperty(@Body(new ValidationPipe({ transform: true })) filter: CreatePropertyDTO): Promise<void> {
        return this.propertyService.createProperty(filter);
    }

    @Get(':propertyId')
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get property by ID' })
    @ApiOkResponse({ type: PropertyEntity })
    getProperty(@Param('propertyId') propertyId: number): Promise<PropertyEntity> {
        return this.propertyService.getProperty(propertyId);
    }

    @Delete(':propertyId')
    @UseInterceptors(AffectedInterceptor)
    @ApiOperation({ summary: 'delete property by ID' })
    deleteProperty(@Param('propertyId') propertyId: number): Promise<DeleteResult> {
        return this.propertyService.deleteProperty(propertyId);
    }
}
