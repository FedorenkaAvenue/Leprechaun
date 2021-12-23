import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { OrderService, OrderServiceNA } from '@services/Order';
import { OrderPublicDTO } from '@dto/Order';
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
        private readonly orderServiceNA: OrderServiceNA
    ) {}

    @Get()
    @ApiOperation({ summary: 'get current active order' })
    @ApiOkResponse({ type: OrderPublicDTO })
    @ApiNotFoundResponse({ description: 'no active order' })
    getCurrentOrder(
        @Session() { id }: ISession
    ): Promise<IOrderPublic> {
        return this.orderServiceNA.getCurrentOrder(id);
    }

    @Post('add')
    @ApiOperation({ summary: 'add new order item' })
    @ApiBadRequestResponse({ description: 'product already exists' })
    addOrderItem(
        @Session() { id }: ISession,
        @Body(new ValidationPipe({ transform: true })) orderItem: CreateOrderItemDTO
    ) {
        return this.orderServiceNA.addOrderItemNA(orderItem, id);
    }

    @Delete('item/:itemId')
    @UseInterceptors(AffectedResultInterceptor)
    @ApiOperation({ summary: 'delete order product by order item ID' })
    @ApiNotFoundResponse({ description: 'order item not found' })
    removeItem(
        @Param('itemId', ParseUUIDPipe) orderItemId: IOrderItem['id']
    ) {
        return this.orderServiceNA.removeOrderItem(orderItemId);
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
