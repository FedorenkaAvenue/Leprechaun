import {
    Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@fedorenkaavenue/leprechaun_lib_entities/server/user';
import {
    PropertyGroup, PropertyGroupPreview, PropertyGroupUpdateParams,
} from '@fedorenkaavenue/leprechaun_lib_entities/server/property_group';
import { Empty } from '@fedorenkaavenue/leprechaun_lib_entities/server/google/protobuf/empty';
import { Category } from '@fedorenkaavenue/leprechaun_lib_entities/server/category';

import { AuthJWTAccessGuard } from '@guards/auth.guard';
import { PropertyGroupCUSchema, PropertyGroupPreviewSchema, PropertyGroupSchema } from './propertyGroup.schema';
import { UserRoleGuard } from '@common/user/user.guard';
import { UserRoleDecorator } from '@common/user/user.decorator';
import PropertyGroupPrivateService from './propertyGroup.service';

@Controller('propertygroup')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@ApiTags('Property group 👨🏿‍💼')
export default class PropertyGroupPrivateController {
    constructor(private readonly propertyGroupService: PropertyGroupPrivateService) { }

    @Post()
    @UserRoleDecorator(UserRole.ADMIN)
    @ApiOperation({ summary: 'add new property group' })
    @ApiBadRequestResponse({ description: 'some of filed is already exists' })
    private createGroup(@Body() group: PropertyGroupCUSchema): Promise<PropertyGroup> {
        return this.propertyGroupService.createGroup(group);
    }

    @Patch(':groupID')
    @UserRoleDecorator(UserRole.ADMIN)
    @ApiOperation({ summary: 'update property group' })
    @ApiNotFoundResponse({ description: 'property group not found' })
    updateGroup(
        @Param('groupID') groupID: PropertyGroupUpdateParams['id'],
        @Body() updates: PropertyGroupCUSchema,
    ): Promise<Empty> {
        return this.propertyGroupService.updateGroup({ id: groupID, data: updates });
    }

    @Get('list/:categoryID')
    @UserRoleDecorator(UserRole.SUPPORT)
    @ApiOperation({ summary: 'get property groups by category ID' })
    @ApiOkResponse({ type: PropertyGroupPreviewSchema, isArray: true })
    private getGroupListByCategoryID(
        @Param('categoryID') categoryID: Category['id'],
    ): Promise<PropertyGroupPreview[]> {
        return this.propertyGroupService.getGroupListByCategoryID(categoryID);
    }

    @Get('list')
    @UserRoleDecorator(UserRole.SUPPORT)
    @ApiOperation({ summary: 'get all property groups' })
    @ApiOkResponse({ type: PropertyGroupPreviewSchema, isArray: true })
    private getGroupList(): Promise<PropertyGroupPreview[]> {
        return this.propertyGroupService.getGroupListPrivate();
    }

    @Get(':groupID')
    @UserRoleDecorator(UserRole.SUPPORT)
    @ApiOperation({ summary: 'get property group by ID' })
    @ApiOkResponse({ type: PropertyGroupSchema })
    private getGroup(@Param('groupID') groupID: number): Promise<PropertyGroup> {
        return this.propertyGroupService.getGroupPrivate(groupID);
    }

    @Delete(':groupID')
    @UserRoleDecorator(UserRole.ADMIN)
    @ApiOperation({ summary: 'delete property group by ID' })
    @ApiNotFoundResponse({ description: 'property group not found' })
    private deleteGroup(@Param('groupID') groupID: number): Promise<Empty> {
        return this.propertyGroupService.deleteGroup(groupID);
    }
}
