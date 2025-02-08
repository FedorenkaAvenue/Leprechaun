import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, UseGuards, UseInterceptors, ValidationPipe,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import OrderService from './order.service';
import { UpdateOrderStatusDTO } from './order.dto';
import { UserRoleGuard } from '@core/user/user.guard';
import { AuthJWTAccessGuard } from '@core/auth/auth.guard';
import { UserRole } from '@core/user/user.enum';
import { UserRoleDecorator } from '@core/user/user.decorator';
import OrderEntity from '@core/order/order.entity';
import { QueriesCommonI } from '@core/queries/queries.interface';
import { OrderI } from '@core/order/order.interface';
import QueryDecorator from '@core/queries/query.decorator';
import NotFoundInterceptor from '@shared/interceptors/notFound.interceptor';
import AffectedResultInterceptor from '@shared/interceptors/affectedResult.interceptor';

@Controller('order')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@ApiTags('Order')
export default class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get(':orderID')
    @UserRoleDecorator(UserRole.SUPPORT)
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get order by ID' })
    @ApiOkResponse({ type: OrderEntity })
    @ApiNotFoundResponse({ description: 'order not found' })
    private getOrderById(
        @Param('orderID', ParseUUIDPipe) orderID: string,
        @QueryDecorator() queries: QueriesCommonI,
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
