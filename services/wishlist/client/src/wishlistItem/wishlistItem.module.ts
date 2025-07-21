import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import WishlistItemEntity from "./wishlistItem.entity";
import WishlistItemService from "./wishlistItem.service";
import WishlistItemListener from "./wishlistItem.listener";
import ProductModule from "@common/product/product.module";
import WishlistModule from "../wishlist/wishlist.module";
import WishlistItemController from "./wishlistItem.controller";
import EventModule from "@common/event/event.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([WishlistItemEntity]),
        ProductModule,
        WishlistModule,
        EventModule,
    ],
    controllers: [WishlistItemController],
    providers: [WishlistItemService, WishlistItemListener],
    exports: [WishlistItemService],
})
export default class WishlistItemModule { }
