import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { OrderI, OrderCustomerDataI, OrderPublicI, OrderSummaryI } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';
import { OrderItemPublicI } from '@interfaces/OrderItem';
import { OrderItemPublic } from '@dto/OrderItem/constructor';

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

export class UpdateOrderStatusDTO implements Pick<OrderI, 'status'> {
    @IsEnum(OrderStatus)
    @ApiProperty({ required: true, enum: OrderStatus })
    status: OrderStatus;
}

export class OrderSummaryDTO implements OrderSummaryI {
    @ApiProperty({ description: 'summary order price' })
    price: number;

    @ApiProperty({ description: 'products amount' })
    productsAmount: number;
}

export class OrderPublicDTO implements OrderPublicI {
    @ApiProperty({ description: 'order ID' })
    id: number;

    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;

    @ApiProperty({ type: OrderItemPublic, isArray: true, description: 'order items array' })
    list: OrderItemPublicI[];

    @ApiProperty({ type: OrderSummaryDTO, description: 'summary order data' })
    summary: OrderSummaryI;

    @ApiProperty({ type: Date, description: 'date of last changed status' })
    updated_at: Date;
}
