import { Body, Controller, Delete, Get, Param, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { CreatePropertyGroupDTO } from '@dto/PropertyGroup';
import { ProductGroupBaseEntity, PropertyGroupEntity } from '@entities/PropertGroup';
import { PropertyGroupService } from '@services/PropertyGroup';
import { IPropertyGroup } from '@interfaces/PropertyGroup';
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
    @ApiOkResponse({ type: ProductGroupBaseEntity, isArray: true })
    getAllGroups(): Promise<IPropertyGroup[]> {
        return this.propertyGroupService.getAllGroups();
    }

    @Get(':groupId')
    @UseInterceptors(UndefinedResultInterceptor)
    @ApiOperation({ summary: 'get property group by ID' })
    @ApiOkResponse({ type: PropertyGroupEntity })
    getGroup(@Param('groupId') groupId: number): Promise<IPropertyGroup> {
        return this.propertyGroupService.getGroup(groupId);
    }

    @Delete(':groupId')
    @UseInterceptors(AffectedResultInterceptor)
    @ApiOperation({ summary: 'delete property group by ID' })
    deleteGroup(@Param('groupId') groupId: number): Promise<DeleteResult> {
        return this.propertyGroupService.deleteGroup(groupId);
    }
}
