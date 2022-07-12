import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { IProductPreview } from '@interfaces/Product';
import { ProductPreviewDTO } from './Product';
import { IOrderItem, IOrderItemPublic } from '@interfaces/OrderItem';
import { OrderItemBaseEntity } from '@entities/OrderItem';

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

export class OrderItemPublicDTO extends OrderItemBaseEntity implements IOrderItemPublic {
    @ApiProperty({ type: ProductPreviewDTO })
    product: IProductPreview;

    constructor({ id, amount, product }: IOrderItem) {
        super();
        this.id = id;
        this.amount = amount;
        this.product = new ProductPreviewDTO(product);
    }
}
