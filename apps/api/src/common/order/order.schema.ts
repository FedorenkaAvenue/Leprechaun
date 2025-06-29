import { ApiProperty } from "@nestjs/swagger";

import { OrderItem, OrderItemsPublicCreate_Item, OrderItemUpdatePublic_Data, OrderPublic_Summary } from "@gen/order";
import { Product } from "@gen/product";

export class OrderItemCreateSchema implements OrderItemsPublicCreate_Item {
    @ApiProperty({ description: 'product ID', required: true })
    product: Product['id'];

    @ApiProperty({
        required: false,
        description: 'product items amount',
        default: 1,
    })
    amount: number;
}

export class OrderItemUpdateSchema implements OrderItemUpdatePublic_Data {
    @ApiProperty({ description: 'order item ID', required: true })
    id: string;

    @ApiProperty({ required: true, description: 'product items amount' })
    amount: OrderItem['amount'];
}

export class OrderSummarySchema implements OrderPublic_Summary {
    @ApiProperty({ description: 'summary order price' })
    price: number;

    @ApiProperty({ description: 'products amount' })
    productsAmount: number;
}
