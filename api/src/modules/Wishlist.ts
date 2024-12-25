import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import WishlistEntity from "@entities/Wishlist";
import WishlistPublicController from "@controllers/Wishlist/public";
import WishlistPublicService from "@services/Wishlist/public";
import WishlistItemEntity from "@entities/WishlistItem";

@Module({
    imports: [TypeOrmModule.forFeature([WishlistEntity, WishlistItemEntity])],
    controllers: [WishlistPublicController],
    providers: [WishlistPublicService],
})
export default class WishlistModule { }
