import { Body, Controller, Delete, Get, Param, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { CreatePropertyGroupDTO } from '@dto/PropertyGroup';
import { PropertyGroupEntity } from '@entities/PropertGroup';
import PropertyGroupService from '@services/PropertyGroup';
import { PropertyGroupI } from '@interfaces/PropertyGroup';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import UndefinedResultInterceptor from '@interceptors/UndefinedResult';

@Controller('adm/propertygroup')
@ApiTags('Property group 🤵🏿‍♂️')
export default class PropertyGroupAdminController {
    constructor(private readonly propertyGroupService: PropertyGroupService) {}

    @Post()
    @ApiOperation({ summary: 'add new property group' })
    @ApiOkResponse({ description: 'success' })
    createGroup(@Body(new ValidationPipe({ transform: true })) group: CreatePropertyGroupDTO): Promise<void> {
        return this.propertyGroupService.createGroup(group);
    }

    @Get('list')
    @ApiOperation({ summary: 'get all property groups' })
    @ApiOkResponse({ type: PropertyGroupEntity, isArray: true })
    getAllGroups(): Promise<PropertyGroupI[]> {
        return this.propertyGroupService.getAllGroups();
    }

    @Get(':groupId')
    @UseInterceptors(UndefinedResultInterceptor)
    @ApiOperation({ summary: 'get property group by ID' })
    @ApiOkResponse({ type: PropertyGroupEntity })
    getGroup(@Param('groupId') groupId: number): Promise<PropertyGroupI> {
        return this.propertyGroupService.getGroup(groupId);
    }

    @Delete(':groupId')
    @UseInterceptors(AffectedResultInterceptor('property group not found'))
    @ApiOperation({ summary: 'delete property group by ID' })
    @ApiNotFoundResponse({ description: 'property group not found' })
    deleteGroup(@Param('groupId') groupId: number): Promise<DeleteResult> {
        return this.propertyGroupService.deleteGroup(groupId);
    }
}