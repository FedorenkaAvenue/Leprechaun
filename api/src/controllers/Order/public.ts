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

import OrderPublicService from '@services/Order/public';
import { CreateOrderDTO } from '@dto/Order';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '@dto/OrderItem';
import { OrderPublic } from '@dto/Order/constructor';
import SessionGuard from '@guards/Session';
import Queries from '@decorators/Query';
import { QueriesCommon } from '@dto/Queries/constructor';

@Controller('order')
@ApiTags('Order 🧑‍💻')
export default class OrderPublicController {
    constructor(private readonly orderService: OrderPublicService) {}

    @Get()
    @ApiOperation({ summary: 'get cart' })
    @ApiOkResponse({ type: OrderPublic })
    getCart(@Session() { id }): Promise<OrderPublic> {
        return this.orderService.getCart(id);
    }

    @Get('list')
    @ApiOperation({ summary: 'get order list (without current cart)' })
    @ApiOkResponse({ type: OrderPublic, isArray: true })
    getOrderHistory(@Session() { id }, @Queries() queries: QueriesCommon): Promise<OrderPublic[]> {
        return this.orderService.getOrderList(id, queries);
    }

    @Post('item')
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'add new order item' })
    @ApiOkResponse({ type: OrderPublic })
    @ApiBadRequestResponse({ description: 'product already exists' })
    addOrderItem(
        @Session() { id },
        @Body(new ValidationPipe({ transform: true })) orderItem: CreateOrderItemDTO,
    ): Promise<OrderPublic> {
        return this.orderService.addOrderItem(orderItem, id);
    }

    @Patch('item/:itemId')
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'change order item amount' })
    @ApiOkResponse({ type: OrderPublic })
    changeOrderItemAmount(
        @Param('itemId', ParseUUIDPipe) itemId: string,
        @Body(new ValidationPipe({ transform: true })) data: UpdateOrderItemDTO,
        @Session() { id },
    ): Promise<OrderPublic> {
        return this.orderService.changeOrderItemAmount(itemId, data, id);
    }

    @Post()
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor())
    @ApiOperation({ summary: 'send order' })
    @ApiOkResponse({ type: OrderPublic })
    sendOrder(
        @Body(new ValidationPipe({ transform: true })) order: CreateOrderDTO,
        @Session() { id },
    ): Promise<UpdateResult> {
        return this.orderService.postOrder(order, id);
    }

    @Delete('item/:itemId')
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'delete order item' })
    @ApiOkResponse({ type: OrderPublic })
    @ApiNotFoundResponse({ description: 'order item not found' })
    removeItem(@Param('itemId', ParseUUIDPipe) orderItemId: string, @Session() { id }): Promise<OrderPublic> {
        return this.orderService.removeOrderItem(orderItemId, id);
    }
}
