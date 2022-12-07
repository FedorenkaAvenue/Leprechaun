import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreatePropertyGroupDTO } from '@dto/PropertyGroup';
import { PropertyGroupEntity } from '@entities/PropertGroup';
import PropertyGroupService from '@services/PropertyGroup/private';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import UndefinedResultInterceptor from '@interceptors/UndefinedResult';

@Controller('adm/propertygroup')
@ApiTags('Property group 🤵🏿‍♂️')
export default class PropertyGroupPrivateController {
    constructor(private readonly propertyGroupService: PropertyGroupService) {}

    @Post()
    @ApiOperation({ summary: 'add new property group' })
    @ApiBadRequestResponse({ description: 'some of filed is already exists' })
    createGroup(
        @Body(new ValidationPipe({ transform: true })) group: CreatePropertyGroupDTO,
    ): Promise<PropertyGroupEntity> {
        return this.propertyGroupService.createGroup(group);
    }

    @Get('list')
    @ApiOperation({ summary: 'get all property groups' })
    @ApiOkResponse({ type: PropertyGroupEntity, isArray: true })
    getAllGroups(): Promise<PropertyGroupEntity[]> {
        return this.propertyGroupService.getGroupList();
    }

    @Get(':groupId')
    @UseInterceptors(UndefinedResultInterceptor)
    @ApiOperation({ summary: 'get property group by ID' })
    @ApiOkResponse({ type: PropertyGroupEntity })
    getGroup(@Param('groupId') groupId: number): Promise<PropertyGroupEntity> {
        return this.propertyGroupService.getGroup(groupId);
    }

    @Patch(':groupId')
    @UseInterceptors(AffectedResultInterceptor('property group not found'))
    @ApiOperation({ summary: 'update property group' })
    @ApiNotFoundResponse({ description: 'property group not found' })
    updateGroup(
        @Param('groupId') groupId: number,
        @Body(new ValidationPipe({ transform: true })) group: CreatePropertyGroupDTO,
    ): Promise<UpdateResult> {
        return this.propertyGroupService.updateGroup(groupId, group);
    }

    @Delete(':groupId')
    @UseInterceptors(AffectedResultInterceptor('property group not found'))
    @ApiOperation({ summary: 'delete property group by ID' })
    @ApiNotFoundResponse({ description: 'property group not found' })
    deleteGroup(@Param('groupId') groupId: number): Promise<DeleteResult> {
        return this.propertyGroupService.deleteGroup(groupId);
    }
}
