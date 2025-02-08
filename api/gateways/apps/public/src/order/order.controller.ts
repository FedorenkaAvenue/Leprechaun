import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Session, UseGuards, UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';

import OrderService from './order.service';
import { CreateOrderDTO, OrderPublic } from './order.dto';
import { OrderPublicI } from './order.interface';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '../orderItem/orderItem.dto';
import { QueriesCommonI } from '@core/queries/queries.interface';
import QueryDecorator from '@core/queries/query.decorator';
import { SessionInitInterceptor } from '@core/session/session.interceptor';
import SessionGuard from '@core/session/session.guard';
import AffectedResultInterceptor from '@shared/interceptors/affectedResult.interceptor';
import NotFoundInterceptor from '@shared/interceptors/notFound.interceptor';

@Controller('order')
@ApiTags('Order')
export default class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get()
    @ApiOperation({ summary: 'get cart' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: OrderPublic })
    private getCart(
        @Session() { id }: Record<string, any>,
        @QueryDecorator() queries: QueriesCommonI,
    ): Promise<OrderPublicI | null> {
        return this.orderService.getCart(id, queries);
    }

    @Get('list')
    @ApiOperation({ summary: 'get order list (without current cart)' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: OrderPublic, isArray: true })
    private getOrderHistory(
        @Session() { id }: Record<string, any>,
        @QueryDecorator() queries: QueriesCommonI,
    ): Promise<OrderPublicI[]> {
        return this.orderService.getOrderList(id, queries);
    }

    @Post('items')
    @UseInterceptors(SessionInitInterceptor, NotFoundInterceptor)
    @ApiOperation({ summary: 'add new order items 🧷' })
    @ApiCookieAuth()
    @ApiBody({ type: CreateOrderItemDTO, isArray: true })
    @ApiOkResponse({ type: OrderPublic })
    private addOrderItem(
        @Session() { id }: Record<string, any>,
        @Body(new ValidationPipe({ transform: true })) orderItems: CreateOrderItemDTO[],
        @QueryDecorator() queries: QueriesCommonI,
    ): Promise<OrderPublicI | null> {
        return this.orderService.addOrderItems(orderItems, id, queries);
    }

    @Patch('item/:itemID')
    @UseGuards(SessionGuard)
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'change order item amount' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: OrderPublic })
    private changeOrderItemAmount(
        @Param('itemID', ParseUUIDPipe) itemID: string,
        @Body(new ValidationPipe({ transform: true })) data: UpdateOrderItemDTO,
        @Session() { id }: Record<string, any>,
        @QueryDecorator() queries: QueriesCommonI,
    ): Promise<OrderPublicI | null> {
        return this.orderService.changeOrderItemAmount(itemID, data, id, queries);
    }

    @Post()
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor())
    @ApiOperation({ summary: 'send order' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: OrderPublic })
    private sendOrder(
        @Body(new ValidationPipe({ transform: true })) order: CreateOrderDTO,
        @Session() { id }: Record<string, any>,
    ): Promise<UpdateResult> {
        return this.orderService.postOrder(order, id);
    }

    @Delete('item/:itemID')
    @UseGuards(SessionGuard)
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'delete order item' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: OrderPublic })
    @ApiNotFoundResponse({ description: 'order item not found' })
    private removeItem(
        @Param('itemID', ParseUUIDPipe) orderItemID: string,
        @Session() { id }: Record<string, any>,
        @QueryDecorator() queries: QueriesCommonI,
    ): Promise<OrderPublicI | null> {
        return this.orderService.removeOrderItem(orderItemID, id, queries);
    }
}
