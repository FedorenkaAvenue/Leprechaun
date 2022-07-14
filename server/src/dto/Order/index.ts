import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

import { IOrder, IOrderCustomerData, IOrderPublic, IOrderSummary } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';
import { OrderBaseEntity } from '@entities/Order';
import { IOrderItemPublic } from '@interfaces/OrderItem';
import { OrderItemPublic } from '@dto/OrderItem/constructor';
import { PriceEntity } from '@entities/_Price';

export class CreateOrderCustomerDataDTO implements IOrderCustomerData {
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
    order: IOrder;

    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateOrderCustomerDataDTO)
    @ApiProperty({
        type: CreateOrderCustomerDataDTO,
        required: true,
        description: 'reciever/user data'
    })
    customer: IOrderCustomerData;
}

export class UpdateOrderStatusDTO implements IOrder {
    @IsEnum(OrderStatus)
    @ApiProperty({ required: true, enum: OrderStatus })
    status?: OrderStatus;
}


export class OrderSummaryDTO implements IOrderSummary {
    @ApiProperty({ type: PriceEntity ,description: 'summary order price' })
    price: number;

    @ApiProperty({ description: 'product\s amount' })
    productsAmount: number;
}

export class OrderPublicDTO extends OrderBaseEntity implements IOrderPublic {
    @ApiProperty({ type: OrderItemPublic, isArray: true, description: 'order items array' })
    list?: IOrderItemPublic[];

    @ApiProperty({ type: OrderSummaryDTO, description: 'summary order data' })
    summary?: IOrderSummary;
}
