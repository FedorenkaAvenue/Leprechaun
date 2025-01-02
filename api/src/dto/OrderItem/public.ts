import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { Price } from '@dto/Price';
import { OrderItemEntity } from '@entities/OrderItem';
import { QueriesCommon } from '@dto/Queries/constructor';
import { PriceI } from '@interfaces/Price';
import { OrderItemI } from '@interfaces/OrderItem';
import { ProductPreviewPublicI } from '@interfaces/Product';
import { ProductPreviewPublic } from '@dto/Product/public';

export class OrderItemPublic implements OrderItemI<ProductPreviewPublicI> {
    @ApiProperty({ description: 'order item ID', required: true })
    id: string;

    @ApiProperty({ type: ProductPreviewPublic })
    product: ProductPreviewPublicI;

    @ApiProperty({ description: 'summary product items price' })
    summaryPrice: PriceI;

    @ApiProperty({ required: true })
    amount: number;

    constructor({ id, amount, product }: OrderItemEntity, lang: QueriesCommon['lang']) {
        this.id = id;
        this.amount = amount;
        this.product = new ProductPreviewPublic(product, lang);
        this.summaryPrice = new Price({
            current: product.price.current * amount,
            old: product.price.old * amount,
        });
    }
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
