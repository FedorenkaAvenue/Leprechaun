import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, UseGuards, UseInterceptors, ValidationPipe,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import OrderPrivateService from '@services/Order/private';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { OrderEntity } from '@entities/Order';
import { UpdateOrderStatusDTO } from '@dto/Order/private';
import { OrderI } from '@interfaces/Order';
import { QueriesCommonI } from '@interfaces/Queries';
import Queries from '@decorators/Query';
import NotFoundInterceptor from '@interceptors/UndefinedResult';
import { AuthJWTAccessGuard } from '@guards/Auth';
import { UserRoleGuard } from '@guards/UserRole';
import { UserRole } from '@enums/User';
import { UserRoleDecorator } from '@decorators/UserRole';

@Controller('adm/order')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@ApiTags('Order 🤵🏿‍♂️')
export default class OrderPrivateController {
    constructor(private readonly orderService: OrderPrivateService) { }

    @Get(':orderID')
    @UserRoleDecorator(UserRole.SUPPORT)
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get order by ID' })
    @ApiOkResponse({ type: OrderEntity })
    @ApiNotFoundResponse({ description: 'order not found' })
    private getOrderById(
        @Param('orderID', ParseUUIDPipe) orderID: string,
        @Queries() queries: QueriesCommonI,
    ): Promise<OrderI | null> {
        return this.orderService.getOrderById(Number(orderID), queries);
    }

    @Get('product/:productID')
    @UserRoleDecorator(UserRole.SUPPORT)
    @ApiOperation({ summary: 'get orders which contain product' })
    @ApiOkResponse({ type: OrderEntity, isArray: true })
    private getOrdersByProductId(@Param('productID', ParseUUIDPipe) productID: string): Promise<OrderI[]> {
        return this.orderService.getOrdersByProductId(productID);
    }

    @Patch('status/:orderID')
    @UserRoleDecorator(UserRole.SUPPORT)
    @UseInterceptors(AffectedResultInterceptor('order not found'))
    @ApiOperation({ summary: 'change order status' })
    @ApiNotFoundResponse({ description: 'order not found' })
    private changeOrderStatus(
        @Param('orderID', ParseUUIDPipe) orderID: string,
        @Body(new ValidationPipe({ transform: true })) body: UpdateOrderStatusDTO,
    ): Promise<UpdateResult> {
        return this.orderService.changeOrderStatus(Number(orderID), body);
    }

    @Get('list')
    @UserRoleDecorator(UserRole.SUPPORT)
    @ApiOperation({ summary: 'get order list' })
    @ApiOkResponse({ type: OrderEntity, isArray: true })
    private getOrders(): Promise<OrderI[]> {
        return this.orderService.getOrders();
    }

    @Delete(':orderID')
    @UserRoleDecorator(UserRole.ADMIN)
    @UseInterceptors(AffectedResultInterceptor('order not found'))
    @ApiOperation({ summary: 'remove order' })
    @ApiNotFoundResponse({ description: 'order not found' })
    private removeOrder(@Param('orderID', ParseUUIDPipe) orderID: string): Promise<DeleteResult> {
        return this.orderService.removeOrder(Number(orderID));
    }
}
