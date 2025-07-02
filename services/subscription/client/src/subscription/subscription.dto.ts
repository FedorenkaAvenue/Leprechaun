import { SubscriptionProductStatus } from "@fedorenkaavenue/leprechaun_lib_entities/server/subscription";
import { User } from '@fedorenkaavenue/leprechaun_lib_entities/server/user';
import { Product } from '@fedorenkaavenue/leprechaun_lib_entities/server/product';
import { QueryCommonParams } from "@fedorenkaavenue/leprechaun_lib_entities/server/common";
import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class SubscriptionProductStatusDTO implements SubscriptionProductStatus {
    @IsNotEmpty()
    @IsString()
    user: User['id'];

    @IsNotEmpty()
    @IsString()
    product: Product['id'];

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsObject()
    queries: QueryCommonParams;
}
