import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@fedorenkaavenue/leprechaun_lib_entities/server/user';
import { Property } from '@fedorenkaavenue/leprechaun_lib_entities/server/property';
import { Empty } from '@fedorenkaavenue/leprechaun_lib_entities/server/google/protobuf/empty';

import { CreatePropertySchema } from './property.schema';
import { UserRoleDecorator } from '@common/user/user.decorator';
import { UserRoleGuard } from '@common/user/user.guard';
import { AuthJWTAccessGuard } from '@guards/auth.guard';
import PropertyPrivateService from './property.service';

@Controller('property')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@ApiTags('Property 👨🏿‍💼')
export default class PropertyPrivateController {
    constructor(private readonly propertyService: PropertyPrivateService) { }

    @Post()
    @UserRoleDecorator(UserRole.ADMIN)
    @ApiOperation({ summary: 'add new property' })
    // @ApiOkResponse({ type: PropertyEntity })
    private createProperty(@Body() data: CreatePropertySchema): Promise<Property> {
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

    // @Get(':propertyID')
    // @UserRoleDecorator(UserRole.SUPPORT)
    // @UseInterceptors(NotFoundInterceptor)
    // @ApiOperation({ summary: 'get property by ID' })
    // @ApiOkResponse({ type: PropertyEntity })
    // private getProperty(@Param('propertyID') propertyID: number): Promise<PropertyI | null> {
    //     return this.propertyService.getProperty(propertyID);
    // }

    @Delete(':propertyID')
    @UserRoleDecorator(UserRole.ADMIN)
    @ApiOperation({ summary: 'delete property by ID' })
    @ApiNotFoundResponse({ description: 'property not found' })
    private deleteProperty(@Param('propertyID') propertyID: number): Promise<Empty> {
        return this.propertyService.deleteProperty(propertyID);
    }
}
