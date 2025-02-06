import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { OrderItemPublic } from '../orderItem/orderItem.dto';
import { OrderItemPublicI } from '../orderItem/orderItem.interface';
import { OrderPublicI } from './order.interface';
import { OrderCustomerDataI, OrderI, OrderSummaryI } from '@core/order/order.interface';
import { OrderItemI } from '@core/orderItem/orderItem.interface';
import { OrderStatus } from '@core/order/order.enum';
import OrderEntity from '@core/order/order.entity';
import { QueriesCommonI } from '@core/queries/queries.interface';
import { ProductStatus } from '@core/product/product.enum';

export class OrderSummary implements OrderSummaryI {
    @ApiProperty({ description: 'summary order price' })
    price: number;

    @ApiProperty({ description: 'products amount' })
    productsAmount: number;

    constructor(items: OrderItemI[]) {
        let productsAmount = 0;

        this.price = items.reduce<number>((acc, { product, amount }) => {
            productsAmount = productsAmount + amount;

            return product.price.current * amount + acc;
        }, 0);
        this.productsAmount = productsAmount;
    }
}

export class OrderPublic implements OrderPublicI {
    @ApiProperty({ description: 'order ID' })
    id: number;

    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;

    @ApiProperty({ type: OrderItemPublic, isArray: true, description: 'available order items' })
    items: OrderItemPublicI[];

    @ApiProperty({ type: OrderItemPublic, isArray: true, description: 'unavailable order items' })
    unavailableItems: OrderItemPublicI[];

    @ApiProperty({ type: OrderSummary, description: 'summary order data' })
    summary: OrderSummaryI;

    @ApiProperty({ type: Date, description: 'date of last changed status' })
    updated_at: Date;

    constructor({ id, status, items, updated_at }: OrderEntity, { lang }: QueriesCommonI) {
        const availableItems = items.filter(({ product: { status } }) => status === ProductStatus.AVAILABLE);

        this.id = id;
        this.status = status;
        this.items = availableItems.map(prod => new OrderItemPublic(prod, lang));
        this.unavailableItems = items.
            filter(({ product: { status } }) => status !== ProductStatus.AVAILABLE).
            map(prod => new OrderItemPublic(prod, lang));
        this.summary = new OrderSummary(availableItems);
        this.updated_at = updated_at;
    }
}

export class CreateOrderCustomerDataDTO implements OrderCustomerDataI {
    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'customer name', required: false })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'customer phone number', required: true })
    phone: string;
}

// post order (update status from 1 to 2)
export class CreateOrderDTO {
    @IsNotEmpty()
    @ApiProperty({ description: 'order object', required: true })
    order: OrderI;

    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateOrderCustomerDataDTO)
    @ApiProperty({
        type: CreateOrderCustomerDataDTO,
        required: true,
        description: 'reciever/user data',
    })
    customer: OrderCustomerDataI;
}
