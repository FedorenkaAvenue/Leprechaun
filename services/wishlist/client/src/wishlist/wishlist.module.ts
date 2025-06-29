import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import WishlistEntity from "./wishlist.entity";
import { WishlistService } from "./wishlist.service";
import ProductModule from "@common/product/product.module";
import WishlistListener from "./wishlist.listener";
import WishlistController from "./wishlist.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([WishlistEntity]),
        ProductModule,
    ],
    controllers: [WishlistController],
    providers: [WishlistService, WishlistListener],
    exports: [WishlistService],
})
export default class WishlistModule { }
