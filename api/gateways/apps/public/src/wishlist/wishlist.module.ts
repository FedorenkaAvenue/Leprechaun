import { Module } from "@nestjs/common";

import WishlistController from "./wishlist.controller";
import WishlistService from "./wishlist.service";
import WishlistCoreModule from '@core/wishlist/wishlist.module';

@Module({
    imports: [WishlistCoreModule],
    controllers: [WishlistController],
    providers: [WishlistService],
})
export default class WishlistModule { }
