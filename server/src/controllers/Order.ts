import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { OrderService, OrderServiceNA } from '@services/Order';
import { OrderPublicDTO } from '@dto/Order';
import { Session } from '@decorators/Session';
import { ISession } from '@interfaces/Session';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { IOrderPublic } from '@interfaces/Order';
import { CreateOrderItemDTO } from '@dto/OrderItem';

@Controller('order')
@ApiTags('Order 🧑‍💻')
export class OrderPublicController {
    constructor(
        private readonly orderServiceNA: OrderServiceNA
    ) {}

    @Get()
    @ApiOperation({ summary: 'get current active order' })
    @ApiOkResponse({ type: OrderPublicDTO })
    getCurrentOrder(
        @Session() { id }: ISession
    ): Promise<IOrderPublic> {
        return this.orderServiceNA.getCurrentOrder(id);
    }

    @Post('add')
    @ApiOperation({ summary: 'add order item' })
    addOrderItem(
        @Session() { id }: ISession,
        @Body(new ValidationPipe({ transform: true })) orderItem: CreateOrderItemDTO
    ) {
        return this.orderServiceNA.addOrderItem(orderItem, id);
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
    removeOrder(
        @Param('orderId', ParseUUIDPipe) orderId: string
    ) {
        return this.orderService.removeOrder(orderId);
    }
}
