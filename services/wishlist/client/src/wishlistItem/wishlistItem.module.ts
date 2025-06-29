import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import WishlistItemEntity from "./wishlistItem.entity";
import WishlistItemService from "./wishlistItem.service";
import WishlistItemListener from "./wishlistItem.listener";
import ProductModule from "@common/product/product.module";
import WishlistModule from "../wishlist/wishlist.module";
import WishlistItemController from "./wishlistItem.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([WishlistItemEntity]),
        ProductModule,
        WishlistModule,
    ],
    controllers: [WishlistItemController],
    providers: [WishlistItemService, WishlistItemListener],
    exports: [WishlistItemService],
})
export default class WishlistItemModule { }
