import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { OrderItemI } from '@interfaces/OrderItem';
import { OrderItemBaseEntity } from '@entities/OrderItem';
import { ProductPreviewI } from '@interfaces/Product';
import { ProductPreviewDTO } from '@dto/Product';
import { PriceI } from '@interfaces/Price';

export class OrderItemDTO extends OrderItemBaseEntity implements OrderItemI<ProductPreviewI> {
    @ApiProperty({ type: ProductPreviewDTO })
    product: ProductPreviewI;

    @ApiProperty({ description: 'summary product items price' })
    summaryPrice?: PriceI;
}

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
    @IsUUID()
    @ApiProperty({ description: 'order item ID', required: true })
    order_item: OrderItemI['id'];

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ required: true, description: 'product items amount' })
    amount: OrderItemI['amount'];
}
