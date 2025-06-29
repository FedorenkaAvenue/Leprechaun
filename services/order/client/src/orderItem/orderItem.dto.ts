import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, IsUUID, ValidateNested } from "class-validator";

import { QueryCommonParams } from "gen/common";
import { Order, OrderItem, OrderItemPublicDelete, OrderItemsPublicCreate, OrderItemsPublicCreate_Item, OrderItemUpdatePublic, OrderItemUpdatePublic_Data } from "gen/order";
import { Product } from "gen/product";
import { User } from "gen/user";

class OrderItemsPublicCreateItemDTO implements OrderItemsPublicCreate_Item {
    @IsUUID()
    @IsNotEmpty()
    product: Product['id'];

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}

export class OrderItemsPublicCreateDTO implements OrderItemsPublicCreate {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemsPublicCreateItemDTO)
    items: OrderItemsPublicCreate_Item[];

    @IsUUID()
    @IsNotEmpty()
    user: User['id'];

    @IsObject()
    @IsNotEmpty()
    queries: QueryCommonParams;
}

class OrderItemUpdatePublicDataDTO implements OrderItemUpdatePublic_Data {
    @IsUUID()
    @IsNotEmpty()
    id: OrderItem['id'];

    @IsNumber()
    @IsNotEmpty()
    amount: OrderItem['amount'];
}

export class OrderItemUpdatePublicDTO implements OrderItemUpdatePublic {
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => OrderItemUpdatePublicDataDTO)
    data: OrderItemUpdatePublic_Data;

    @IsUUID()
    @IsNotEmpty()
    user: string;

    @IsObject()
    @IsNotEmpty()
    queries: QueryCommonParams;
}

export class OrderItemPublicDeleteDTO implements OrderItemPublicDelete {
    @IsUUID()
    @IsNotEmpty()
    id: OrderItem['id'];

    @IsUUID()
    @IsNotEmpty()
    user: string;

    @IsObject()
    @IsNotEmpty()
    queries: QueryCommonParams;
}
