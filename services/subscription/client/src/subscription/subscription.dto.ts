import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { QueryCommonParams } from "gen/common";

import { Product } from "gen/product"
import { SubscriptionProductStatus } from "gen/subscription";
import { User } from "gen/user"

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
