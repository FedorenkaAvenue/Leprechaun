import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString,
    IsUUID, ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

import { IOrder, IOrderItem, IOrderCustomerData } from '@interfaces/Order';

// export class CreateCustomerOrderDataDTO implements IOrderCustomerData {
//     @IsNotEmpty()
//     @IsString()
//     @ApiProperty({ required: true, description: 'user name' })
//     name: string;

//     @IsNotEmpty()
//     @IsString()
//     @ApiProperty({ required: true, description: 'user phone' })
//     phone: string;
// }

export class CreateOrderItemDTO implements IOrderItem {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({ description: 'product ID', required: true })
    product_id: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        required: false,
        description: 'product items amount',
        default: 1
    })
    amount: number;
}

// export class CreateOrderDTO implements IOrder {
//     @IsArray()
//     @ValidateNested({ each: true })
//     @Type(() => CreateOrderItemDTO)
//     @ApiProperty({
//         type: CreateOrderItemDTO,
//         isArray: true,
//         required: true,
//         description: 'array of products and their amount'
//     })
//     order_items: IOrderItem[];

//     @IsObject()
//     @IsNotEmptyObject()
//     @ValidateNested()
//     @Type(() => CreateCustomerOrderDataDTO)
//     @ApiProperty({
//         type: CreateCustomerOrderDataDTO,
//         required: true,
//         description: 'user data'
//     })
//     customer: IOrderCustomerData;
// }
