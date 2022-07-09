import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

import { IOrder, IOrderCustomerData, IOrderPublic } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';
import { OrderBaseEntity } from '@entities/Order';
import { IOrderItemPublic } from '@interfaces/OrderItem';
import { OrderItemPublicDTO } from './OrderItem';

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

export class UpdateOrderStatusDTO implements IOrder {
    @IsEnum(OrderStatus)
    @ApiProperty({ required: true, enum: OrderStatus })
    status?: OrderStatus;
}
