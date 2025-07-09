import { ApiProperty } from '@nestjs/swagger';
import { OrderItemPublic, OrderPublic, OrderStatus } from "@fedorenkaavenue/leprechaun_lib_entities/server/order";

import { ProductPreviewPublicSchema } from '../product/product.schema';
import { ProductPriceSchema } from '@common/product/product.schema';
import { OrderSummarySchema } from '@common/order/order.schema';

export class OrderItemPublicSchema implements OrderItemPublic {
    @ApiProperty({ type: ProductPriceSchema, required: true })
    summaryPrice: ProductPriceSchema;

    @ApiProperty({ description: 'order item ID', required: true })
    id: string;

    @ApiProperty({ type: ProductPreviewPublicSchema, required: true })
    product: ProductPreviewPublicSchema;

    @ApiProperty({ required: true })
    amount: number;
}

export class OrderPublicSchema implements OrderPublic {
    @ApiProperty({ description: 'order ID' })
    id: number;

    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;

    @ApiProperty({ type: OrderItemPublicSchema, isArray: true, description: 'available order items' })
    items: OrderItemPublicSchema[];

    @ApiProperty({ type: OrderItemPublicSchema, isArray: true, description: 'unavailable order items' })
    unavailableItems: OrderItemPublicSchema[];

    @ApiProperty({ type: OrderSummarySchema, description: 'summary order data' })
    summary: OrderSummarySchema;
}
