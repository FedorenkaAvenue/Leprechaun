import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseInterceptors,
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
import { CreateOrderItemDTO } from '@dto/OrderItem';
import { IOrderItem } from '@interfaces/OrderItem';

@Controller('order')
@ApiTags('Order 🧑‍💻')
export class OrderPublicController {
    constructor(
        private readonly orderService : OrderService
    ) {}

    @Get()
    @ApiOperation({ summary: 'get current active order' })
    @ApiOkResponse({ type: OrderPublicDTO })
    @ApiNotFoundResponse({ description: 'no active order' })
    getCurrentOrder(
        @Session() { id }: ISession
    ): Promise<IOrderPublic> {
        return this.orderService.getCurrentOrder(id);
    }

    @Get('history')
    @ApiOperation({ summary: 'get order history' })
    @ApiOkResponse({ type: OrderPublicDTO, isArray: true })
    getOrderHistory(
        @Session() { id }: ISession
    ): Promise<IOrderPublic[]> {
        return this.orderService.getOrderHistory(id);
    }

    @Post('add')
    @ApiOperation({ summary: 'add new order item' })
    @ApiBadRequestResponse({ description: 'product already exists' })
    addOrderItem(
        @Session() { id }: ISession,
        @Body(new ValidationPipe({ transform: true })) orderItem: CreateOrderItemDTO
    ) {
        return this.orderService.addOrderItem(orderItem, id);
    }

    @Post('amount')
    @UseInterceptors(AffectedResultInterceptor)
    @ApiOperation({ summary: 'change order item amount' })
    changeOrderItemAmount(
        @Body(new ValidationPipe({ transform: true })) orderItem: CreateOrderItemDTO
    ): Promise<UpdateResult> {
        return this.orderService.changeOrderItemAmount(orderItem);
    }

    @Post()
    @UseInterceptors(AffectedResultInterceptor)
    @ApiOperation({ summary: 'post order' })
    postOrder(
        @Body(new ValidationPipe({ transform: true })) order: CreateOrderDTO
    ): Promise<UpdateResult> {
        return this.orderService.postOrder(order);
    }

    @Delete('item/:itemId')
    @UseInterceptors(AffectedResultInterceptor)
    @ApiOperation({ summary: 'delete order product by order item ID' })
    @ApiNotFoundResponse({ description: 'order item not found' })
    removeItem(
        @Param('itemId', ParseUUIDPipe) orderItemId: IOrderItem['id']
    ) {
        return this.orderService.removeOrderItem(orderItemId);
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
