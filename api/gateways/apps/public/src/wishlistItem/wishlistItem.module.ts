import { Module } from "@nestjs/common";

import WishlistItemController from "./wishlistItem.controller";
import WishlistItemService from "./wishlistItem.service";
import WihlistItemCoreModule from '@core/wishlistItem/wishlistitem.module';
import WishlistCoreModule from '@core/wishlist/wishlist.module';

@Module({
    imports: [WihlistItemCoreModule, WishlistCoreModule],
    controllers: [WishlistItemController],
    providers: [WishlistItemService],
    exports: [WihlistItemCoreModule],
})
export default class WishlistItemModule { }
