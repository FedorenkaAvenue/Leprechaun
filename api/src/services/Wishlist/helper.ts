import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import WishlistItemEntity from '@entities/WishlistItem';
import { SessionI } from '@interfaces/Session';
import { WishListIPublicI } from '@interfaces/Wishlist';
import { WishlistItemPublic } from '@dto/WishlistItem/constructor';
import { WishlistItemI } from '@interfaces/WishlistItem';
import { PRODUCT_DEEP_RELATIONS } from '@constants/relations';

@Injectable()
export default class WishlistHelperService {
    constructor(
        @InjectRepository(WishlistItemEntity) public readonly wishlistItemRepo: Repository<WishlistItemEntity>,
    ) {}

    /**
     * @description get current wishlist by session ID
     * @param sid
     * @returns wishlist
     */
    async getWishList(sid: SessionI['sid']): Promise<WishListIPublicI> {
        const wishlist = await this.wishlistItemRepo.find({
            where: { sid },
            relations: PRODUCT_DEEP_RELATIONS,
        });

        return wishlist.map(item => new WishlistItemPublic(item));
    }

    async getWishlistItem(id: WishlistItemI['id']): Promise<WishlistItemEntity> {
        return this.wishlistItemRepo.findOne({
            where: { id },
            relations: PRODUCT_DEEP_RELATIONS,
        });
    }
}
