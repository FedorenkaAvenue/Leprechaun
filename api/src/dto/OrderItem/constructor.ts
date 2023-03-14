import { ApiProperty } from '@nestjs/swagger';

import { Price } from '@dto/Price/constructor';
import { ProductPreview } from '@dto/Product/constructor';
import { OrderItemEntity } from '@entities/OrderItem';
import { QueriesCommon } from '@dto/Queries/constructor';
import { ProductPreviewI } from '@interfaces/Product';
import { PriceI } from '@interfaces/Price';
import { OrderItemI } from '@interfaces/OrderItem';

export class OrderItemPublic implements OrderItemI<ProductPreviewI> {
    @ApiProperty({ description: 'order item ID', required: true })
    id: string;

    @ApiProperty({ type: ProductPreview })
    product: ProductPreviewI;

    @ApiProperty({ description: 'summary product items price' })
    summaryPrice: PriceI;

    @ApiProperty({ required: true })
    amount: number;

    constructor({ id, amount, product }: OrderItemEntity, searchParams: QueriesCommon) {
        this.id = id;
        this.amount = amount;
        this.product = new ProductPreview(product, searchParams);
        this.summaryPrice = new Price({
            current: product.price.current * amount,
            old: product.price.old * amount,
        });
    }
}
