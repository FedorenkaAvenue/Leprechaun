import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { OrderItemPublicI } from './orderItem.interface';
import { ProductPreviewPublic } from '../product/product.dto';
import { ProductPreviewPublicI } from '../product/product.interface';
import { OrderItemEntity } from '@core/orderItem/orderItem.entity';
import { QueriesCommonI } from '@core/queries/queries.interface';
import { ProductI } from '@core/product/product.interface';
import { OrderItemI } from '@core/orderItem/orderItem.interface';
import { PriceI } from '@shared/interfaces/price.interface';
import { PriceDTO } from '@shared/dto/price.dto';

export class OrderItemPublic implements OrderItemPublicI {
    @ApiProperty({ description: 'order item ID', required: true })
    id: string;

    @ApiProperty({ type: ProductPreviewPublic })
    product: ProductPreviewPublicI;

    @ApiProperty({ description: 'summary product items price' })
    summaryPrice: PriceI;

    @ApiProperty({ required: true })
    amount: number;

    constructor({ id, amount, product }: OrderItemEntity, lang: QueriesCommonI['lang']) {
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
