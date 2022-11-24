import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import WishlistItemEntity from '@entities/WishlistItem';
import { SessionI } from '@interfaces/Session';
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
    async getWishList(sid: SessionI['sid']): Promise<WishlistItemEntity[]> {
        return await this.wishlistItemRepo.find({
            where: { sid },
            relations: PRODUCT_DEEP_RELATIONS,
        });
    }

    async getWishlistItem(id: WishlistItemI['id']): Promise<WishlistItemEntity> {
        return this.wishlistItemRepo.findOne({
            where: { id },
            relations: PRODUCT_DEEP_RELATIONS,
        });
    }
}
