import { User } from "@fedorenkaavenue/leprechaun_lib_entities/client/user";
import { QueryCommonParams } from "@fedorenkaavenue/leprechaun_lib_entities/server/common";
import {
    OrderItem,
    OrderItemPublicDelete,
    OrderItemsPublicCreate,
    OrderItemsPublicCreate_Item,
    OrderItemUpdatePublic,
    OrderItemUpdatePublic_Data,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/order";
import { Product } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsUUID, ValidateNested } from "class-validator";

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
