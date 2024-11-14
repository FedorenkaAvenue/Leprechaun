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
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import SessionGuard from '@guards/Session';
import Queries from '@decorators/Query';
import { QueriesCommon } from '@dto/Queries/constructor';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '@dto/OrderItem/private';
import { CreateOrderDTO, OrderPublic } from '@dto/Order/public';

@Controller('order')
@ApiTags('Order 🧑‍💻')
export default class OrderPublicController {
    constructor(private readonly orderService: OrderPublicService) { }

    @Get()
    @ApiOperation({ summary: 'get cart' })
    @ApiOkResponse({ type: OrderPublic })
    private getCart(@Session() { id }, @Queries() queries: QueriesCommon): Promise<OrderPublic> {
        return this.orderService.getCart(id, queries);
    }

    @Get('list')
    @ApiOperation({ summary: 'get order list (without current cart)' })
    @ApiOkResponse({ type: OrderPublic, isArray: true })
    private getOrderHistory(@Session() { id }, @Queries() queries: QueriesCommon): Promise<OrderPublic[]> {
        return this.orderService.getOrderList(id, queries);
    }

    @Post('item')
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'add new order item' })
    @ApiOkResponse({ type: OrderPublic })
    @ApiBadRequestResponse({ description: 'product already exists' })
    private addOrderItem(
        @Session() { id },
        @Body(new ValidationPipe({ transform: true })) orderItem: CreateOrderItemDTO,
        @Queries() queries: QueriesCommon,
    ): Promise<OrderPublic> {
        return this.orderService.addOrderItem(orderItem, id, queries);
    }

    @Patch('item/:itemID')
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'change order item amount' })
    @ApiOkResponse({ type: OrderPublic })
    private changeOrderItemAmount(
        @Param('itemID', ParseUUIDPipe) itemID: string,
        @Body(new ValidationPipe({ transform: true })) data: UpdateOrderItemDTO,
        @Session() { id },
        @Queries() queries: QueriesCommon,
    ): Promise<OrderPublic> {
        return this.orderService.changeOrderItemAmount(itemID, data, id, queries);
    }

    @Post()
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor())
    @ApiOperation({ summary: 'send order' })
    @ApiOkResponse({ type: OrderPublic })
    private sendOrder(
        @Body(new ValidationPipe({ transform: true })) order: CreateOrderDTO,
        @Session() { id },
    ): Promise<UpdateResult> {
        return this.orderService.postOrder(order, id);
    }

    @Delete('item/:itemID')
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'delete order item' })
    @ApiOkResponse({ type: OrderPublic })
    @ApiNotFoundResponse({ description: 'order item not found' })
    private removeItem(
        @Param('itemID', ParseUUIDPipe) orderItemID: string,
        @Session() { id },
        @Queries() queries: QueriesCommon,
    ): Promise<OrderPublic> {
        return this.orderService.removeOrderItem(orderItemID, id, queries);
    }
}
