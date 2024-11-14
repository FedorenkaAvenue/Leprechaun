import { ApiProperty } from '@nestjs/swagger';

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
