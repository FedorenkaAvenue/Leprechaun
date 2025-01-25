import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import { PropertyGroupEntity } from '@entities/PropertGroup';
import PropertyGroupService from '@services/PropertyGroup/private';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import NotFoundInterceptor from '@interceptors/UndefinedResult';
import { CategoryI } from '@interfaces/Category';
import { PropertyGroupCreateDTO, PropertyGroupUpdateDTO } from '@dto/PropertyGroup/private';
import { PropertyGroupI, PropertyGroupPreviewI } from '@interfaces/PropertyGroup';

@Controller('adm/propertygroup')
@ApiTags('Property group 🤵🏿‍♂️')
export default class PropertyGroupPrivateController {
    constructor(private readonly propertyGroupService: PropertyGroupService) { }

    @Post()
    @ApiOperation({ summary: 'add new property group' })
    @ApiBadRequestResponse({ description: 'some of filed is already exists' })
    private createGroup(
        @Body(new ValidationPipe({ transform: true })) group: PropertyGroupCreateDTO,
    ): Promise<PropertyGroupI> {
        return this.propertyGroupService.createGroup(group);
    }

    @Patch(':groupID')
    @UseInterceptors(AffectedResultInterceptor('property group not found'))
    @ApiOperation({ summary: 'update property group' })
    @ApiNotFoundResponse({ description: 'property group not found' })
    updateGroup(
        @Param('groupID') groupID: number,
        @Body(new ValidationPipe({ transform: true })) updates: PropertyGroupUpdateDTO,
    ): Promise<UpdateResult> {
        return this.propertyGroupService.updateGroup(groupID, updates);
    }

    @Get('list/:categoryID')
    @ApiOperation({ summary: 'get property groups by category ID' })
    @ApiOkResponse({ type: PropertyGroupEntity, isArray: true })
    private getGroupListByCategoryID(
        @Param('categoryID') categoryID: CategoryI['id'],
    ): Promise<PropertyGroupPreviewI[]> {
        return this.propertyGroupService.getGroupListByCategoryID(categoryID);
    }

    @Get('list')
    @ApiOperation({ summary: 'get all property groups' })
    @ApiOkResponse({ type: PropertyGroupEntity, isArray: true })
    private getGroupList(): Promise<PropertyGroupPreviewI[]> {
        return this.propertyGroupService.getGroupList();
    }

    @Get(':groupID')
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get property group by ID' })
    @ApiOkResponse({ type: PropertyGroupEntity })
    private getGroup(@Param('groupID') groupID: number): Promise<PropertyGroupI | null> {
        return this.propertyGroupService.getGroup(groupID);
    }

    @Delete(':groupID')
    @UseInterceptors(AffectedResultInterceptor('property group not found'))
    @ApiOperation({ summary: 'delete property group by ID' })
    @ApiNotFoundResponse({ description: 'property group not found' })
    private deleteGroup(@Param('groupID') groupID: number): Promise<DeleteResult> {
        return this.propertyGroupService.deleteGroup(groupID);
    }
}
