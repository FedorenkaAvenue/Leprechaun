import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, DeleteResult } from 'typeorm';

import { ProductI } from '@interfaces/Product';
import { SessionI } from '@interfaces/Session';
import WishlistAdminService from './admin';
import WishlistItemEntity from '@entities/WishlistItem';
import { WishlistItemI, WishlistItemPublicI } from '@interfaces/WishlistItem';
import { WishlistItemPublic } from '@dto/WishlistItem/constructor';

@Injectable()
export default class WishlistService extends WishlistAdminService {
    async addItem(product: ProductI['id'], sid: SessionI['sid']): Promise<WishlistItemPublicI> {
        const res = await this.wishlistItemRepo.findOneBy({
            product: { id: product },
            sid,
        });

        if (res) throw new BadRequestException('product is already added to wishlist');

        try {
            const { id } = await this.wishlistItemRepo.save({ product, sid } as DeepPartial<WishlistItemEntity>);

            return new WishlistItemPublic(await this.getWishlistItem(id));
        } catch (err) {
            console.log(err);
            throw new NotFoundException('product not found');
        }
    }

    async removeItem(id: WishlistItemI['id']): Promise<DeleteResult> {
        return await this.wishlistItemRepo.delete({ id });
    }

    async clearWishlist(sid: SessionI['sid']): Promise<DeleteResult> {
        return this.wishlistItemRepo.delete({ sid });
    }
}
