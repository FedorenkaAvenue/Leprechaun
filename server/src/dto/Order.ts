import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString,
    IsUUID, ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

import { IOrder, IOrderItem, IOrderCustomerData } from '@interfaces/Order';
import { IUser } from '@interfaces/User';

export class CreateOrderDTO implements IOrder {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDTO)
    @ApiProperty({ required: true, description: 'array of products and their amount' })
    order_items: IOrderItem[];

    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateUserOrderDataDTO)
    @ApiProperty({ required: true, description: 'user data' })
    customer: IOrderCustomerData;
}

export class CreateUserOrderDataDTO implements IOrderCustomerData {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true, description: 'user name' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true, description: 'user phone' })
    phone: string;
}

export class CreateOrderItemDTO implements IOrderItem {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({ description: 'product ID', required: true })
    product_id: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ required: true, description: 'product items amount' })
    amount: number;
}
