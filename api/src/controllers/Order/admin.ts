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

import { OrderService } from '@services/Order';
import { UpdateOrderStatusDTO } from '@dto/Order';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { IOrder, IOrderPublic } from '@interfaces/Order';
import { OrderEntity } from '@entities/Order';
import { OrderPublic } from '@dto/Order/constructor';

@Controller('adm/order')
@ApiTags('Order 🤵🏿‍♂️')
export default class OrderAdminController {
    constructor(private readonly orderService: OrderService) {}

    @Get(':orderId')
    @ApiOperation({ summary: 'get order by ID' })
    @ApiOkResponse({ type: OrderPublic })
    @ApiNotFoundResponse({ description: 'order not found' })
    getOrderById(@Param('orderId', ParseUUIDPipe) orderId: string): Promise<IOrderPublic> {
        return this.orderService.getOrderById(orderId);
    }

    @Get('product/:productId')
    @ApiOperation({ summary: 'get orders which contain product' })
    @ApiOkResponse({ type: OrderEntity, isArray: true })
    getOrdersByProductId(@Param('productId', ParseUUIDPipe) productId: string): Promise<IOrder[]> {
        return this.orderService.getOrdersByProductId(productId);
    }

    @Patch('status/:orderId')
    @UseInterceptors(AffectedResultInterceptor)
    @ApiOperation({ summary: 'change order status' })
    changeOrderStatus(
        @Param('orderId', ParseUUIDPipe) orderId: string,
        @Body(new ValidationPipe({ transform: true })) body: UpdateOrderStatusDTO,
    ) {
        return this.orderService.changeOrderStatus(orderId, body);
    }

    // TODO query filers
    @Get('list')
    @ApiOperation({ summary: 'get order list' })
    @ApiOkResponse({ type: OrderEntity, isArray: true })
    getOrders(): Promise<IOrder[]> {
        return this.orderService.getAdminOrders();
    }

    @Delete(':orderId')
    @UseInterceptors(AffectedResultInterceptor)
    @ApiOperation({ summary: 'remove order' })
    @ApiNotFoundResponse({ description: 'order not found' })
    removeOrder(@Param('orderId', ParseUUIDPipe) orderId: string) {
        return this.orderService.removeOrder(orderId);
    }
}
