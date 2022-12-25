import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { CreatePropertyDTO } from '@dto/Property';
import { PropertyEntity } from '@entities/Property';
import PropertyService from '@services/Property/private';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import UndefinedResultInterceptor from '@interceptors/UndefinedResult';

@Controller('adm/property')
@ApiTags('Property 🤵🏿‍♂️')
export default class PropertyPrivateController {
    constructor(private readonly propertyService: PropertyService) {}

    @Post()
    @ApiOperation({ summary: 'add new property' })
    @ApiOkResponse({ type: PropertyEntity })
    createProperty(@Body(new ValidationPipe({ transform: true })) data: CreatePropertyDTO): Promise<PropertyEntity> {
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
    @UseInterceptors(UndefinedResultInterceptor)
    @ApiOperation({ summary: 'get property by ID' })
    @ApiOkResponse({ type: PropertyEntity })
    getProperty(@Param('propertyID') propertyID: number): Promise<PropertyEntity> {
        return this.propertyService.getProperty(propertyID);
    }

    @Delete(':propertyID')
    @UseInterceptors(AffectedResultInterceptor('property not found'))
    @ApiOperation({ summary: 'delete property by ID' })
    @ApiNotFoundResponse({ description: 'property not found' })
    deleteProperty(@Param('propertyID') propertyID: number): Promise<DeleteResult> {
        return this.propertyService.deleteProperty(propertyID);
    }
}
