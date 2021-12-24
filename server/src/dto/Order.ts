import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString,
    IsUUID, ValidateNested
} from 'class-validator';

import { IOrder, IOrderCustomerData, IOrderPublic } from '@interfaces/Order';
import { OrderBaseEntity } from '@src/entities/Order';
import { IOrderItemPublic } from '@interfaces/OrderItem';
import { OrderItemPublicDTO } from './OrderItem';
import { Type } from 'class-transformer';

export class CreateOrderCustomerDataDTO implements IOrderCustomerData {
    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'customer name', required: false })
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'customer phone number', required: true })
    phone: string;
}

export class CreateOrderDTO implements IOrder {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({ description: 'order ID', required: true })
    id: string;

    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateOrderCustomerDataDTO)
    @ApiProperty({
        type: CreateOrderCustomerDataDTO,
        required: true,
        description: 'customer data'
    })
    customer: IOrderCustomerData;
}

export class OrderPublicDTO extends OrderBaseEntity implements IOrderPublic {
    @ApiProperty({ type: OrderItemPublicDTO, isArray: true })
    list?: IOrderItemPublic[];

    constructor({ id, status, list }: IOrder) {
        super();
        this.id = id;
        this.status = status;
        this.list = list.map(prod => new OrderItemPublicDTO(prod))
    }
}
