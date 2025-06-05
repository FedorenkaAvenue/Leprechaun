import {
    Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors, ValidationPipe,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

// import { PropertyGroupCreateDTO, PropertyGroupUpdateDTO } from './propertyGroup.dto';
// import { PropertyGroupPreviewI } from './propertyGroup.interface';
import { AuthJWTAccessGuard } from '@guards/auth.guard';
import { UserRole } from '@gen/user';
import { PropertyGroup, PropertyGroupPreview } from '@gen/prop_group';
import AffectedResultInterceptor from '@interceptors/AffectedResultInterceptorr';
import { PropertyGroupSchema } from './propertyGroup.schema';
import { UserRoleGuard } from '@common/user/user.guard';
import PropertyGroupService from '@common/propertyGroup/propertyGroup.service';
import { UserRoleDecorator } from '@common/user/user.decorator';

@Controller('propertygroup')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@ApiTags('Property group')
export default class PropertyGroupPrivateController {
    constructor(private readonly propertyGroupService: PropertyGroupService) { }

    // @Post()
    // @UserRoleDecorator(UserRole.ADMIN)
    // @ApiOperation({ summary: 'add new property group' })
    // @ApiBadRequestResponse({ description: 'some of filed is already exists' })
    // private createGroup(
    //     @Body(new ValidationPipe({ transform: true })) group: PropertyGroupCreateDTO,
    // ): Promise<PropertyGroup> {
    //     return this.propertyGroupService.createGroup(group);
    // }

    // @Patch(':groupID')
    // @UserRoleDecorator(UserRole.ADMIN)
    // @UseInterceptors(AffectedResultInterceptor('property group not found'))
    // @ApiOperation({ summary: 'update property group' })
    // @ApiNotFoundResponse({ description: 'property group not found' })
    // updateGroup(
    //     @Param('groupID') groupID: number,
    //     @Body(new ValidationPipe({ transform: true })) updates: PropertyGroupUpdateDTO,
    // ): Promise<UpdateResult> {
    //     return this.propertyGroupService.updateGroup(groupID, updates);
    // }

    // @Get('list/:categoryID')
    // @UserRoleDecorator(UserRole.SUPPORT)
    // @ApiOperation({ summary: 'get property groups by category ID' })
    // @ApiOkResponse({ type: PropertyGroupEntity, isArray: true })
    // private getGroupListByCategoryID(
    //     @Param('categoryID') categoryID: CategoryI['id'],
    // ): Promise<PropertyGroupPreviewI[]> {
    //     return this.propertyGroupService.getGroupListByCategoryID(categoryID);
    // }

    @Get('list')
    @UserRoleDecorator(UserRole.SUPPORT)
    @ApiOperation({ summary: 'get all property groups' })
    @ApiOkResponse({ type: PropertyGroupSchema, isArray: true })
    private getGroupList(): Promise<PropertyGroupPreview[]> {
        return this.propertyGroupService.getGroupListPrivate();
    }

    // @Get(':groupID')
    // @UserRoleDecorator(UserRole.SUPPORT)
    // @UseInterceptors(NotFoundInterceptor)
    // @ApiOperation({ summary: 'get property group by ID' })
    // @ApiOkResponse({ type: PropertyGroupEntity })
    // private getGroup(@Param('groupID') groupID: number): Promise<PropertyGroupI | null> {
    //     return this.propertyGroupService.getGroup(groupID);
    // }

    // @Delete(':groupID')
    // @UserRoleDecorator(UserRole.ADMIN)
    // @UseInterceptors(AffectedResultInterceptor('property group not found'))
    // @ApiOperation({ summary: 'delete property group by ID' })
    // @ApiNotFoundResponse({ description: 'property group not found' })
    // private deleteGroup(@Param('groupID') groupID: number): Promise<DeleteResult> {
    //     return this.propertyGroupService.deleteGroup(groupID);
    // }
}
