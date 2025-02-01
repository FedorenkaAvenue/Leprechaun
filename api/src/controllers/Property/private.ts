import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { PropertyEntity } from '@entities/Property';
import PropertyService from '@services/Property/private';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import NotFoundInterceptor from '@interceptors/UndefinedResult';
import { CreatePropertyDTO } from '@dto/Property/private';
import { PropertyI } from '@interfaces/Property';
import { AuthJWTAccessGuard } from '@guards/Auth';
import { UserRoleGuard } from '@guards/UserRole';
import { UserRoleDecorator } from '@decorators/UserRole';
import { UserRole } from '@enums/User';

@Controller('adm/property')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@ApiTags('Property 🤵🏿‍♂️')
export default class PropertyPrivateController {
    constructor(private readonly propertyService: PropertyService) { }

    @Post()
    @UserRoleDecorator(UserRole.ADMIN)
    @ApiOperation({ summary: 'add new property' })
    @ApiOkResponse({ type: PropertyEntity })
    private createProperty(
        @Body(new ValidationPipe({ transform: true })) data: CreatePropertyDTO,
    ): Promise<PropertyI> {
        return this.propertyService.createProperty(data);
    }

    // @Patch(':propertyID')
    // @UseInterceptors(AffectedResultInterceptor('property not found'))
    // @ApiOperation({ summary: 'update property' })
    // @ApiNotFoundResponse({ description: 'property not found' })
    // updateProperty(
    //     @Param('propertyID') propertyID: number,
    //     @Body(new ValidationPipe({ transform: true })) data: CreatePropertyDTO,
    // ) {
    //     return this.propertyService.updateProperty(propertyID, data);
    // }

    @Get(':propertyID')
    @UserRoleDecorator(UserRole.SUPPORT)
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get property by ID' })
    @ApiOkResponse({ type: PropertyEntity })
    private getProperty(@Param('propertyID') propertyID: number): Promise<PropertyI | null> {
        return this.propertyService.getProperty(propertyID);
    }

    @Delete(':propertyID')
    @UserRoleDecorator(UserRole.ADMIN)
    @UseInterceptors(AffectedResultInterceptor('property not found'))
    @ApiOperation({ summary: 'delete property by ID' })
    @ApiNotFoundResponse({ description: 'property not found' })
    private deleteProperty(@Param('propertyID') propertyID: number): Promise<DeleteResult> {
        return this.propertyService.deleteProperty(propertyID);
    }
}
