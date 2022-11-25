import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, DeleteResult } from 'typeorm';

import { ProductI } from '@interfaces/Product';
import { SessionI } from '@interfaces/Session';
import WishlistService from '.';
import WishlistItemEntity from '@entities/WishlistItem';
import { WishlistItemI } from '@interfaces/WishlistItem';
import { WishlistItemPublic } from '@dto/WishlistItem/constructor';

@Injectable()
export default class WishlistPublicService extends WishlistService {
    async getWishlist(sid: SessionI['sid']): Promise<WishlistItemPublic[]> {
        const res = await this.getWishlistBySID(sid);

        return res.map(item => new WishlistItemPublic(item));
    }

    async addItem(product: ProductI['id'], sid: SessionI['sid']): Promise<WishlistItemPublic> {
        const res = await this.wishlistItemRepo.findOneBy({
            product: { id: product },
            sid,
        });

        if (res) throw new BadRequestException('product is already added to wishlist');

        try {
            const { id } = await this.wishlistItemRepo.save({ product, sid } as DeepPartial<WishlistItemEntity>);

            return new WishlistItemPublic(await this.getWishlistItemByID(id));
        } catch (err) {
            throw new NotFoundException('product not found');
        }
    }

    async removeItem(sid: SessionI['sid'], id: WishlistItemI['id']): Promise<DeleteResult> {
        return await this.wishlistItemRepo.delete({ sid, id });
    }

    async clearWishlist(sid: SessionI['sid']): Promise<DeleteResult> {
        return this.wishlistItemRepo.delete({ sid });
    }
}
