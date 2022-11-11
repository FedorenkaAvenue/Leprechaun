import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { OrderI, OrderCustomerDataI, OrderPublicT, OrderSummaryI } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';
import { OrderBaseEntity } from '@entities/Order';
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

export class UpdateOrderStatusDTO implements OrderI {
    @IsEnum(OrderStatus)
    @ApiProperty({ required: true, enum: OrderStatus })
    status?: OrderStatus;
}

export class OrderSummaryDTO implements OrderSummaryI {
    @ApiProperty({ description: 'summary order price' })
    price: number;

    @ApiProperty({ description: 'products amount' })
    productsAmount: number;
}

export class OrderPublicDTO extends OrderBaseEntity implements OrderPublicT {
    @ApiProperty({ type: OrderItemPublic, isArray: true, description: 'order items array' })
    list?: OrderItemPublicI[];

    @ApiProperty({ type: OrderSummaryDTO, description: 'summary order data' })
    summary?: OrderSummaryI;
}
