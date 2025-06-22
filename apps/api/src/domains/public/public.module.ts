import { Module } from "@nestjs/common";

import WishlistPublicModule from "./services/wishlist/wishlist.module";
import OrderPublicModule from "./services/order/order.module";
import CategoryPublicModule from "./services/category/category.module";
import HistoryPublicModule from "./services/history/history.module";

@Module({
    imports: [
        WishlistPublicModule,
        OrderPublicModule,
        CategoryPublicModule,
        HistoryPublicModule,
    ],
})
export default class PublicModule { }
