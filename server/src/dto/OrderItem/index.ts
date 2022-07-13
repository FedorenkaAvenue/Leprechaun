import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { IOrderItem } from '@interfaces/OrderItem';
import { OrderItemBaseEntity } from '@entities/OrderItem';
import { IProductPreview } from '@interfaces/Product';
import { ProductPreviewDTO } from '@dto/Product';
import { IPrice } from '@interfaces/Price';

export class OrderItemDTO extends OrderItemBaseEntity implements IOrderItem<IProductPreview> {
    @ApiProperty({ type: ProductPreviewDTO })
    product: IProductPreview;

    @ApiProperty({ description: 'summary product items price' })
    summaryPrice?: IPrice;
}

export class CreateOrderItemDTO implements IOrderItem<string> {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({ description: 'product ID', required: true })
    product: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        required: false,
        description: 'product items amount',
        default: 1
    })
    amount: number;
}

export class UpdateOrderItemDTO {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({ description: 'order item ID', required: true })
    order_item: IOrderItem['id'];

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ required: true, description: 'product items amount' })
    amount: IOrderItem['amount'];
}
