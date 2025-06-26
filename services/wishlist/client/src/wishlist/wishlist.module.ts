import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import WishlistEntity from "./wishlist.entity";
import { WishlistService } from "./wishlist.service";
import ProductModule from "@common/product/product.module";
import WishlistController from "./wishlist.controller";
import WishlistItemModule from "../wishlistItem/wishlistItem.module";
import WishlistListener from "./wishlist.listener";

@Module({
    imports: [
        TypeOrmModule.forFeature([WishlistEntity]),
        ProductModule,
        WishlistItemModule,
    ],
    controllers: [WishlistController],
    providers: [WishlistService, WishlistListener],
})
export default class WishlistModule { }
