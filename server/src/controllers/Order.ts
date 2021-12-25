import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseInterceptors,
    ValidationPipe
} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation,
    ApiTags
} from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';

import { OrderService } from '@services/Order';
import { CreateOrderDTO, OrderPublicDTO } from '@dto/Order';
import { Session } from '@decorators/Session';
import { ISession } from '@interfaces/Session';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { IOrderPublic } from '@interfaces/Order';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '@dto/OrderItem';
import { IOrderItem } from '@interfaces/OrderItem';

@Controller('order')
@ApiTags('Order 🧑‍💻')
export class OrderPublicController {
    constructor(
        private readonly orderService : OrderService
    ) {}

    @Get()
    @ApiOperation({ summary: 'get current order (basket)' })
    @ApiOkResponse({ type: OrderPublicDTO })
    @ApiNotFoundResponse({ description: 'no active order' })
    getCurrentOrder(
        @Session() { id }: ISession
    ): Promise<IOrderPublic> {
        return this.orderService.getCurrentOrder(id);
    }

    @Post('item')
    @ApiOperation({ summary: 'add new order item' })
    @ApiOkResponse({ type: OrderPublicDTO })
    @ApiBadRequestResponse({ description: 'product already exists' })
    addOrderItem(
        @Session() { id }: ISession,
        @Body(new ValidationPipe({ transform: true })) orderItem: CreateOrderItemDTO
    ): Promise<IOrderPublic> {
        return this.orderService.addOrderItem(orderItem, id);
    }

    @Patch('item')
    @ApiOperation({ summary: 'change order item amount' })
    @ApiOkResponse({ type: OrderPublicDTO })
    changeOrderItemAmount(
        @Body(new ValidationPipe({ transform: true })) orderItem: UpdateOrderItemDTO,
        @Session() { id }: ISession
    ): Promise<IOrderPublic> {
        return this.orderService.changeOrderItemAmount(orderItem, id);
    }

    @Post()
    @UseInterceptors(AffectedResultInterceptor)
    @ApiOperation({ summary: 'send order' })
    @ApiOkResponse({ type: OrderPublicDTO })
    sendOrder(
        @Body(new ValidationPipe({ transform: true })) order: CreateOrderDTO
    ): Promise<UpdateResult> {
        return this.orderService.sendOrder(order);
    }

    @Delete('item/:itemId')
    @ApiOperation({ summary: 'delete order item' })
    @ApiOkResponse({ type: OrderPublicDTO })
    @ApiNotFoundResponse({ description: 'order item not found' })
    removeItem(
        @Param('itemId', ParseUUIDPipe) orderItemId: IOrderItem['id'],
        @Session() { id }: ISession
    ): Promise<IOrderPublic> {
        return this.orderService.removeOrderItem(orderItemId, id);
    }

    @Get('history')
    @ApiOperation({ summary: 'get order history' })
    @ApiOkResponse({ type: OrderPublicDTO, isArray: true })
    getOrderHistory(
        @Session() { id }: ISession
    ): Promise<IOrderPublic[]> {
        return this.orderService.getOrderHistory(id);
    }
}

@Controller('adm/order')
@ApiTags('Order 🤵🏿‍♂️')
export class OrderAdminController {
    constructor(
        private readonly orderService: OrderService
    ) {}

    @Delete(':orderId')
    @UseInterceptors(AffectedResultInterceptor)
    @ApiOperation({ summary: 'remove order' })
    @ApiNotFoundResponse({ description: 'order not found' })
    removeOrder(
        @Param('orderId', ParseUUIDPipe) orderId: string
    ) {
        return this.orderService.removeOrder(orderId);
    }
}
