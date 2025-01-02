import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { OrderItemI, OrderItemPublicI } from '@interfaces/OrderItem';
import { OrderEntity } from '@entities/Order';
import { QueriesCommon } from '@dto/Queries';
import { OrderCustomerDataI, OrderI, OrderPublicI, OrderSummaryI } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';
import { OrderItemPublic } from '@dto/OrderItem/public';

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
    items: OrderItemPublicI[];

    @ApiProperty({ type: OrderSummary, description: 'summary order data' })
    summary: OrderSummaryI;

    @ApiProperty({ type: Date, description: 'date of last changed status' })
    updated_at: Date;

    constructor({ id, status, items, updated_at }: OrderEntity, { lang }: QueriesCommon) {
        this.id = id;
        this.status = status;
        this.items = items.map(prod => new OrderItemPublic(prod, lang));
        this.summary = new OrderSummary(items);
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
