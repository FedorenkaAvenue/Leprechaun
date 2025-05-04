import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import PropertyService from './property.service';
import { UserRoleDecorator } from '@core/user/user.decorator';
import { CreatePropertyDTO } from './property.dto';
import { UserRole } from '@core/user/user.enum';
import { AuthJWTAccessGuard } from '@core/auth/auth.guard';
import { UserRoleGuard } from '@core/user/user.guard';
import { PropertyEntity } from '@core/property/property.entity';
import { PropertyI } from '@core/property/property.interface';
import NotFoundInterceptor from '@shared/interceptors/notFound.interceptor';
import AffectedResultInterceptor from '@shared/interceptors/affectedResult.interceptor';

@Controller('property')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@ApiTags('Property')
export default class PropertyController {
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
