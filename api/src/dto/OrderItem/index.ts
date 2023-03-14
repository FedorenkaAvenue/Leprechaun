import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { OrderItemI } from '@interfaces/OrderItem';

export class CreateOrderItemDTO implements OrderItemI<string> {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({ description: 'product ID', required: true })
    product: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        required: false,
        description: 'product items amount',
        default: 1,
    })
    amount: number;
}

export class UpdateOrderItemDTO {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ required: true, description: 'product items amount' })
    amount: OrderItemI['amount'];
}
