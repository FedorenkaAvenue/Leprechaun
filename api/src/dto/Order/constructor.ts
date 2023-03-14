import { ApiProperty } from '@nestjs/swagger';

import { OrderItemI, OrderItemPublicI } from '@interfaces/OrderItem';
import { OrderItemPublic } from '@dto/OrderItem/constructor';
import { OrderEntity } from '@entities/Order';
import { QueriesCommon } from '@dto/Queries/constructor';
import { OrderPublicI, OrderSummaryI } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';

export class OrderSummary implements OrderSummaryI {
    @ApiProperty({ description: 'summary order price' })
    price: number;

    @ApiProperty({ description: 'products amount' })
    productsAmount: number;

    constructor(items: OrderItemI[]) {
        this.price = items.reduce<number>((prev, { product, amount }) => product.price.current * amount + prev, 0);
        this.productsAmount = items.length;
    }
}

export class OrderPublic implements OrderPublicI {
    @ApiProperty({ description: 'order ID' })
    id: number;

    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;

    @ApiProperty({ type: OrderItemPublic, isArray: true, description: 'order items array' })
    list: OrderItemPublicI[];

    @ApiProperty({ type: OrderSummary, description: 'summary order data' })
    summary: OrderSummaryI;

    @ApiProperty({ type: Date, description: 'date of last changed status' })
    updated_at: Date;

    constructor({ id, status, list, updated_at }: OrderEntity, searchParams: QueriesCommon) {
        this.id = id;
        this.status = status;
        this.list = list.map(prod => new OrderItemPublic(prod, searchParams));
        this.summary = new OrderSummary(list);
        this.updated_at = updated_at;
    }
}
