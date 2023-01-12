import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { OrderItemI } from '@interfaces/OrderItem';
import { ProductPreviewI } from '@interfaces/Product';
import { ProductPreviewDTO } from '@dto/Product';
import { PriceI } from '@interfaces/Price';

export class OrderItemDTO implements OrderItemI<ProductPreviewI> {
    @ApiProperty({ description: 'order item ID', required: true })
    id: string;

    @ApiProperty({ type: ProductPreviewDTO })
    product: ProductPreviewI;

    @ApiProperty({ description: 'summary product items price' })
    summaryPrice: PriceI;

    @ApiProperty({ required: true })
    amount: number;
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
    @IsNumber()
    @ApiProperty({ required: true, description: 'product items amount' })
    amount: OrderItemI['amount'];
}
