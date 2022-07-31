import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import WishlistEntity from '@entities/Wishlist';
import WishlistService from '@services/Wishlist';
import WishlistPublicController from '@controllers/Wishlist/public';

@Module({
    imports: [ TypeOrmModule.forFeature([ WishlistEntity ]) ],
    controllers: [ WishlistPublicController ],
    providers: [ WishlistService ],
    exports: [ WishlistService ]
})
export default class WishlistModule {}
