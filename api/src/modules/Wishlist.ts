import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import WishlistEntity from "@entities/Wishlist";
import WishlistPublicController from "@controllers/Wishlist/public";
import WishlistPublicService from "@services/Wishlist/public";
import WishlistItemEntity, { WishlistItemSubscriber } from "@entities/WishlistItem";
import WishlistItemPublicController from "@controllers/WishlistItem/public";

@Module({
    imports: [TypeOrmModule.forFeature([WishlistEntity, WishlistItemEntity])],
    controllers: [WishlistItemPublicController, WishlistPublicController],
    providers: [WishlistPublicService, WishlistItemSubscriber],
})
export default class WishlistModule { }
