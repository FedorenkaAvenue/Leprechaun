import { Module } from "@nestjs/common";

import WishlistPublicModule from "./services/wishlist/wishlist.module";
import OrderPublicModule from "./services/order/order.module";
import CategoryPublicModule from "./services/category/category.module";

@Module({
    imports: [
        WishlistPublicModule,
        OrderPublicModule,
        CategoryPublicModule,
    ],
})
export default class PublicModule { }
