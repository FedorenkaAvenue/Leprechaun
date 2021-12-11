import { Body, Controller, Delete, Get, Param, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { CreatePropertyDTO } from '@dto/Property';
import { PropertyEntity } from '@entities/Property';
import { PropertyService } from '@services/Property';
import { AffectedInterceptor, NotFoundInterceptor } from '@interceptors/responce';
import { IProperty } from '@interfaces/Property';

@Controller('property')
@ApiTags('Property (admin)')
export class PropertyAdminController {
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
    getProperty(@Param('propertyId') propertyId: number): Promise<IProperty> {
        return this.propertyService.getProperty(propertyId);
    }

    @Delete(':propertyId')
    @UseInterceptors(AffectedInterceptor)
    @ApiOperation({ summary: 'delete property by ID' })
    deleteProperty(@Param('propertyId') propertyId: number): Promise<DeleteResult> {
        return this.propertyService.deleteProperty(propertyId);
    }
}
