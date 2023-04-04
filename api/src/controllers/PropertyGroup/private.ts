import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { CreatePropertyGroupDTO } from '@dto/PropertyGroup';
import { PropertyGroupEntity } from '@entities/PropertGroup';
import PropertyGroupService from '@services/PropertyGroup/private';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import UndefinedResultInterceptor from '@interceptors/UndefinedResult';
import { CategoryI } from '@interfaces/Category';

@Controller('adm/propertygroup')
@ApiTags('Property group 🤵🏿‍♂️')
export default class PropertyGroupPrivateController {
    constructor(private readonly propertyGroupService: PropertyGroupService) {}

    @Post()
    @ApiOperation({ summary: 'add new property group' })
    @ApiBadRequestResponse({ description: 'some of filed is already exists' })
    private createGroup(
        @Body(new ValidationPipe({ transform: true })) group: CreatePropertyGroupDTO,
    ): Promise<PropertyGroupEntity> {
        return this.propertyGroupService.createGroup(group);
    }

    // @Patch(':groupID')
    // @UseInterceptors(AffectedResultInterceptor('property group not found'))
    // @ApiOperation({ summary: 'update property group' })
    // @ApiNotFoundResponse({ description: 'property group not found' })
    // updateGroup(
    //     @Param('groupID') groupID: number,
    //     @Body(new ValidationPipe({ transform: true })) group: CreatePropertyGroupDTO,
    // ): Promise<PropertyGroupEntity> {
    //     return this.propertyGroupService.updateGroup(groupID, group);
    // }

    @Get('list/:categoryID')
    @ApiOperation({ summary: 'get property groups by category ID' })
    @ApiOkResponse({ type: PropertyGroupEntity, isArray: true })
    private getGroupListByCategoryID(@Param('categoryID') categoryID: CategoryI['id']): Promise<PropertyGroupEntity[]> {
        return this.propertyGroupService.getGroupListByCategoryID(categoryID);
    }

    @Get('list')
    @ApiOperation({ summary: 'get all property groups' })
    @ApiOkResponse({ type: PropertyGroupEntity, isArray: true })
    private getGroupList(): Promise<PropertyGroupEntity[]> {
        return this.propertyGroupService.getGroupList();
    }

    @Get(':groupID')
    @UseInterceptors(UndefinedResultInterceptor)
    @ApiOperation({ summary: 'get property group by ID' })
    @ApiOkResponse({ type: PropertyGroupEntity })
    private getGroup(@Param('groupID') groupID: number): Promise<PropertyGroupEntity> {
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
