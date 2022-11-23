import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Session,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';

import OrderService from '@services/Order';
import { CreateOrderDTO } from '@dto/Order';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { OrderPublicI } from '@interfaces/Order';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '@dto/OrderItem';
import { OrderPublic } from '@dto/Order/constructor';
import { SessionGuard } from '@guards/Session';

@Controller('order')
@ApiTags('Order 🧑‍💻')
export default class OrderPublicController {
    constructor(private readonly orderService: OrderService) {}

    @Get('list')
    @ApiOperation({ summary: 'get order list (without current cart)' })
    @ApiOkResponse({ type: OrderPublic, isArray: true })
    getOrderHistory(@Session() { id }): Promise<OrderPublicI[]> {
        return this.orderService.getOrderList(id);
    }

    @Post('item')
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'add new order item' })
    @ApiOkResponse({ type: OrderPublic })
    @ApiBadRequestResponse({ description: 'product already exists' })
    addOrderItem(
        @Session() { id },
        @Body(new ValidationPipe({ transform: true })) orderItem: CreateOrderItemDTO,
    ): Promise<OrderPublicI> {
        return this.orderService.addOrderItem(orderItem, id);
    }

    @Patch('item')
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'change order item amount (ПЕРЕДЕЛАТЬ order ID через path)' })
    @ApiOkResponse({ type: OrderPublic })
    changeOrderItemAmount(
        @Body(new ValidationPipe({ transform: true })) orderItem: UpdateOrderItemDTO,
        @Session() { id },
    ): Promise<OrderPublicI> {
        return this.orderService.changeOrderItemAmount(orderItem, id);
    }

    @Post()
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor())
    @ApiOperation({ summary: 'send order' })
    @ApiOkResponse({ type: OrderPublic })
    sendOrder(@Body(new ValidationPipe({ transform: true })) order: CreateOrderDTO): Promise<UpdateResult> {
        return this.orderService.sendOrder(order);
    }

    @Delete('item/:itemId')
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'delete order item' })
    @ApiOkResponse({ type: OrderPublic })
    @ApiNotFoundResponse({ description: 'order item not found' })
    removeItem(@Param('itemId', ParseUUIDPipe) orderItemId: string, @Session() { id }): Promise<OrderPublicI> {
        return this.orderService.removeOrderItem(orderItemId, id);
    }
}
