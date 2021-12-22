import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { OrderService } from '@services/Order';
import { CreateOrderItemDTO } from '@dto/Order';
import { Session } from '@decorators/Session';
import { ISession } from '@interfaces/Session';

@Controller('order')
@ApiTags('Order 🧑‍💻')
export class OrderPublicController {
    constructor(
        private readonly orderService: OrderService
    ) {}

    @Post('add')
    @ApiOperation({ summary: 'add order item' })
    addOrderItem(
        @Session() { id }: ISession,
        @Body(new ValidationPipe({ transform: true })) orderItem: CreateOrderItemDTO
    ) {        
        this.orderService.addOrderItem(orderItem);
    }
}
