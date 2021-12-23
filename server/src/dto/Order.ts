import { ApiProperty } from '@nestjs/swagger';

import { IOrder, IOrderPublic } from '@interfaces/Order';
import { OrderBaseEntity } from '@src/entities/Order';
import { IOrderItemPublic } from '@interfaces/OrderItem';
import { OrderItemPublicDTO } from './OrderItem';

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
