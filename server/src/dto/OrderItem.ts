import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { IProduct, IProductPreview } from '@src/interfaces/Product';
import { ProductPreviewDTO } from './Product';
import { IOrderItem, IOrderItemPublic } from '@interfaces/OrderItem';
import { OrderItemBaseEntity } from '@entities/OrderItemEntity';

export class CreateOrderItemDTO implements IOrderItem {
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

export class OrderItemPublicDTO extends OrderItemBaseEntity implements IOrderItemPublic {
    @ApiProperty({ type: ProductPreviewDTO })
    product: IProductPreview;

    constructor({ id, amount, product }: IOrderItem) {
        super();
        this.id = id;
        this.amount = amount;
        this.product = new ProductPreviewDTO(product as IProduct);
    }
}
