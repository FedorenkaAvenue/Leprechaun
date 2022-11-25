import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import OrderPrivateService from '@services/Order/private';
import { UpdateOrderStatusDTO } from '@dto/Order';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { OrderEntity } from '@entities/Order';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('adm/order')
@ApiTags('Order 🤵🏿‍♂️')
export default class OrderPrivateController {
    constructor(private readonly orderService: OrderPrivateService) {}

    @Get(':orderId')
    @ApiOperation({ summary: 'get order by ID' })
    @ApiOkResponse({ type: OrderEntity })
    @ApiNotFoundResponse({ description: 'order not found' })
    getOrderById(@Param('orderId', ParseUUIDPipe) orderId: string): Promise<OrderEntity> {
        return this.orderService.getOrderById(Number(orderId));
    }

    @Get('product/:productId')
    @ApiOperation({ summary: 'get orders which contain product' })
    @ApiOkResponse({ type: OrderEntity, isArray: true })
    getOrdersByProductId(@Param('productId', ParseUUIDPipe) productId: string): Promise<OrderEntity[]> {
        return this.orderService.getOrdersByProductId(productId);
    }

    @Patch('status/:orderId')
    @UseInterceptors(AffectedResultInterceptor('order not found'))
    @ApiOperation({ summary: 'change order status' })
    @ApiNotFoundResponse({ description: 'order not found' })
    changeOrderStatus(
        @Param('orderId', ParseUUIDPipe) orderId: string,
        @Body(new ValidationPipe({ transform: true })) body: UpdateOrderStatusDTO,
    ): Promise<UpdateResult> {
        return this.orderService.changeOrderStatus(Number(orderId), body);
    }

    @Get('list')
    @ApiOperation({ summary: 'get order list' })
    @ApiOkResponse({ type: OrderEntity, isArray: true })
    getOrders(): Promise<OrderEntity[]> {
        return this.orderService.getOrders();
    }

    @Delete(':orderId')
    @UseInterceptors(AffectedResultInterceptor('order not found'))
    @ApiOperation({ summary: 'remove order' })
    @ApiNotFoundResponse({ description: 'order not found' })
    removeOrder(@Param('orderId', ParseUUIDPipe) orderId: string): Promise<DeleteResult> {
        return this.orderService.removeOrder(Number(orderId));
    }
}
