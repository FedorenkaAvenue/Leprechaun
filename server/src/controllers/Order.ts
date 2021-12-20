import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { OrderService } from '@services/Order';
import { CreateOrderDTO } from '@dto/Order';

@Controller('order')
@ApiTags('Order 🧑‍💻')
export class OrderPublicController {
    constructor(
        private readonly orderService: OrderService
    ) {}

    @Post()
    @ApiOperation({ summary: 'create order' })
    @ApiOkResponse({ description: 'successful created' })
    createOrder(
        @Body(new ValidationPipe({ transform: true })) order: CreateOrderDTO
    ): Promise<void> {
        return this.orderService.createOrder(order);
    }
}
