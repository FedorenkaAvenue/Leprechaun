import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { PriceDTO } from '@dto/Price';
import { OrderItemEntity } from '@entities/OrderItem';
import { QueriesCommon } from '@dto/Queries';
import { PriceI } from '@interfaces/Price';
import { OrderItemI, OrderItemPublicI } from '@interfaces/OrderItem';
import { ProductI, ProductPreviewPublicI } from '@interfaces/Product';
import { ProductPreviewPublic } from '@dto/Product/public';

export class OrderItemPublic implements OrderItemPublicI {
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
        this.summaryPrice = new PriceDTO({
            current: product.price.current * amount,
            old: product.price.old ? product.price.old * amount : null,
        });
    }
}

export class CreateOrderItemDTO {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({ description: 'product ID', required: true })
    product: ProductI['id'];

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
