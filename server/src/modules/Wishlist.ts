import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import WishlistEntity from '@entities/Wishlist';
import WishlistService from '@services/Wishlist';
import { WishlistPublicController } from '@controllers/Wishlist';

@Module({
    imports: [ TypeOrmModule.forFeature([ WishlistEntity ]), ],
    controllers: [ WishlistPublicController ],
    providers: [ WishlistService ]
})
export default class WishlistModule {}