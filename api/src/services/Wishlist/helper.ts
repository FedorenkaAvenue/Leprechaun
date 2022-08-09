import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductPublic } from '@dto/Product/constructor';
import WishlistEntity from '@entities/Wishlist';
import { ISession } from '@interfaces/Session';
import { TWishListPublic } from '@interfaces/Wishlist';
import { PRODUCT_DEEP_RELATIONS } from '../Product';

@Injectable()
export default class WishlistHelperService {
    constructor(@InjectRepository(WishlistEntity) public readonly wishlistRepo: Repository<WishlistEntity>) {}

    /**
     * @description get current wishlist by session ID
     * @param session_id
     * @returns wishlist
     */
    async getWishlist(session_id: ISession['id']): Promise<TWishListPublic> {
        const wishlist = await this.wishlistRepo.find({
            where: { session_id },
            relations: PRODUCT_DEEP_RELATIONS,
        });

        return wishlist.map(({ product }) => new ProductPublic(product));
    }

    clearUselessWishlist() {
        console.log(111);
    }
}
