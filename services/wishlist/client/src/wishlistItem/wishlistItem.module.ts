import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import WishlistItemEntity from "./wishlistItem.entity";
import WishlistItemService from "./wishlistItem.service";
import WishlistItemListener from "./wishlistItem.listener";
import ProductModule from "@common/product/product.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([WishlistItemEntity]),
        ProductModule,
    ],
    providers: [WishlistItemService, WishlistItemListener],
    exports: [WishlistItemService],
})
export default class WishlistItemModule { }
