import { ApiProperty } from '@nestjs/swagger';

import { IsEnum } from 'class-validator';
import { OrderStatus } from '@core/order/order.enum';
import { OrderI } from '@core/order/order.interface';

export class UpdateOrderStatusDTO implements Pick<OrderI, 'status'> {
    @IsEnum(OrderStatus)
    @ApiProperty({ required: true, enum: OrderStatus })
    status: OrderStatus;
}
