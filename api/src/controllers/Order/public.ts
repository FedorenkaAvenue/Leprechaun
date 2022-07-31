import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseInterceptors, ValidationPipe
} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags
} from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';

import { OrderService } from '@services/Order';
import { CreateOrderDTO } from '@dto/Order';
import { Session } from '@decorators/Session';
import { ISession } from '@interfaces/Session';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { IOrderPublic } from '@interfaces/Order';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '@dto/OrderItem';
import { OrderPublic } from '@dto/Order/constructor';

@Controller('order')
@ApiTags('Order 🧑‍💻')
export default class OrderPublicController {
    constructor(
        private readonly orderService : OrderService
    ) {}

    @Post('item')
    @ApiOperation({ summary: 'add new order item' })
    @ApiOkResponse({ type: OrderPublic })
    @ApiBadRequestResponse({ description: 'product already exists' })
    addOrderItem(
        @Session() { id }: ISession,
        @Body(new ValidationPipe({ transform: true })) orderItem: CreateOrderItemDTO
    ): Promise<IOrderPublic> {
        return this.orderService.addOrderItem(orderItem, id);
    }

    @Patch('item')
    @ApiOperation({ summary: 'change order item amount (ПЕРЕДЕЛАТЬ order ID через path)' })
    @ApiOkResponse({ type: OrderPublic })
    changeOrderItemAmount(
        @Body(new ValidationPipe({ transform: true })) orderItem: UpdateOrderItemDTO,
        @Session() { id }: ISession
    ): Promise<IOrderPublic> {
        return this.orderService.changeOrderItemAmount(orderItem, id);
    }

    @Post()
    @UseInterceptors(AffectedResultInterceptor)
    @ApiOperation({ summary: 'send order' })
    @ApiOkResponse({ type: OrderPublic })
    sendOrder(
        @Body(new ValidationPipe({ transform: true })) order: CreateOrderDTO
    ): Promise<UpdateResult> {
        return this.orderService.sendOrder(order);
    }

    @Delete('item/:itemId')
    @ApiOperation({ summary: 'delete order item' })
    @ApiOkResponse({ type: OrderPublic })
    @ApiNotFoundResponse({ description: 'order item not found' })
    removeItem(
        @Param('itemId', ParseUUIDPipe) orderItemId: string,
        @Session() { id }: ISession
    ): Promise<IOrderPublic> {
        return this.orderService.removeOrderItem(orderItemId, id);
    }

    @Get('history')
    @ApiOperation({ summary: 'get order history' })
    @ApiOkResponse({ type: OrderPublic, isArray: true })
    getOrderHistory(
        @Session() { id }: ISession
    ): Promise<IOrderPublic[]> {
        return this.orderService.getOrderHistory(id);
    }
}
