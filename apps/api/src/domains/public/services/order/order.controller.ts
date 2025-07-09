import {
    Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryCommonParams } from '@fedorenkaavenue/leprechaun_lib_entities/server/common';
import { User } from '@fedorenkaavenue/leprechaun_lib_entities/server/user';
import { OrderPublic } from '@fedorenkaavenue/leprechaun_lib_entities/server/order';

import OrderService from '@common/order/order.service';
import QueryDecorator from '@common/queries/query.decorator';
import Credentials from '@public/shared/decorators/credentials.decorator';
import { OrderPublicSchema } from './order.schema';
import { UnknownUserResponce } from '@public/shared/guards/UnknownUserResponce.guard';
import SessionInitInterceptor from '@public/shared/interceptors/sessionInit.interceptor';
import CredentialsGuard from '@public/shared/guards/Credentials.guard';
import { OrderItemCreateSchema, OrderItemUpdateSchema } from '@common/order/order.schema';

@Controller('order')
@ApiTags('Order 🧑‍💻')
export default class OrderPublicController {
    constructor(private readonly orderService: OrderService) { }

    @Get()
    @UseGuards(UnknownUserResponce(null))
    @ApiOperation({ summary: 'get cart' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: OrderPublicSchema })
    private getCart(
        @Credentials('userId') user: User['id'],
        @QueryDecorator() queries: QueryCommonParams,
    ): Promise<OrderPublic | null> {
        return this.orderService.getCartPublic(user, queries);
    }

    @Get('list')
    @UseGuards(UnknownUserResponce([]))
    @ApiOperation({ summary: 'get order list (without cart)' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: OrderPublicSchema, isArray: true })
    private getOrderHistory(
        @Credentials('userId') user: User['id'],
        @QueryDecorator() queries: QueryCommonParams,
    ): Promise<OrderPublic[]> {
        return this.orderService.getOderListPublic(user, queries);
    }

    @Post('items')
    @UseInterceptors(SessionInitInterceptor)
    @ApiOperation({ summary: 'add new order items 🧷' })
    @ApiCookieAuth()
    @ApiBody({ type: OrderItemCreateSchema, isArray: true })
    @ApiOkResponse({ type: OrderPublicSchema })
    private addOrderItem(
        @Body() orderItems: OrderItemCreateSchema[],
        @Credentials('userId') user: User['id'],
        @QueryDecorator() queries: QueryCommonParams,
    ): Promise<OrderPublic> {
        return this.orderService.addOrderItemPublic(orderItems, user, queries);
    }

    @Patch('item')
    @UseGuards(CredentialsGuard)
    @ApiOperation({ summary: 'change order item amount' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: OrderPublicSchema })
    private changeOrderItemAmount(
        @Body() data: OrderItemUpdateSchema,
        @Credentials('userId') user: User['id'],
        @QueryDecorator() queries: QueryCommonParams,
    ): Promise<OrderPublic> {
        console.log(data, user);

        return this.orderService.changeOrderItemAmountPublic(data, user, queries);
    }

    // @Post()
    // @UseGuards(SessionGuard)
    // @UseInterceptors(AffectedResultInterceptor())
    // @ApiOperation({ summary: 'send order' })
    // @ApiCookieAuth()
    // @ApiOkResponse({ type: OrderPublic })
    // private sendOrder(
    //     @Body(new ValidationPipe({ transform: true })) order: CreateOrderDTO,
    //     @Session() { id }: Record<string, any>,
    // ): Promise<UpdateResult> {
    //     return this.orderService.postOrder(order, id);
    // }

    @Delete('item/:itemID')
    @UseGuards(CredentialsGuard)
    @ApiOperation({ summary: 'delete order item' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: OrderPublicSchema })
    @ApiNotFoundResponse({ description: 'order item not found' })
    private removeOrderItem(
        @Param('itemID') orderItemID: string,
        @Credentials('userId') user: User['id'],
        @QueryDecorator() queries: QueryCommonParams,
    ): Promise<OrderPublic> {
        return this.orderService.deleteOrderItemPublic(orderItemID, user, queries);
    }
}
