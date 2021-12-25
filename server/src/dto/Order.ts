import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString,
    ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

import { IOrder, IOrderCustomerData, IOrderPublic } from '@interfaces/Order';
import { OrderBaseEntity } from '@entities/Order';
import { IOrderItemPublic } from '@interfaces/OrderItem';
import { OrderItemPublicDTO } from './OrderItem';

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
    customer: string;
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
