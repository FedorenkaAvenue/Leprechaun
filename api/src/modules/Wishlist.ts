import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import WishlistItemEntity from '@entities/WishlistItem';
import WishlistPublicService from '@services/Wishlist/public';
import WishlistPublicController from '@controllers/Wishlist/public';

@Module({
    imports: [TypeOrmModule.forFeature([WishlistItemEntity])],
    controllers: [WishlistPublicController],
    providers: [WishlistPublicService],
})
export default class WishlistModule {}
