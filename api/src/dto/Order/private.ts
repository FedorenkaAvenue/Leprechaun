import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { OrderI } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';

export class UpdateOrderStatusDTO implements Pick<OrderI, 'status'> {
    @IsEnum(OrderStatus)
    @ApiProperty({ required: true, enum: OrderStatus })
    status: OrderStatus;
}
