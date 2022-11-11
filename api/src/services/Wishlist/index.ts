import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, DeleteResult } from 'typeorm';

import { ProductI } from '@interfaces/Product';
import { SessionI } from '@interfaces/Session';
import { WishListTPublicT } from '@interfaces/Wishlist';
import WishlistAdminService from './admin';
import WishlistEntity from '@entities/Wishlist';

@Injectable()
export default class WishlistService extends WishlistAdminService {
    async addItem(product: ProductI['id'], session_id: SessionI['id']): Promise<WishListTPublicT> {
        const res = await this.wishlistRepo.findOneBy({
            product: { id: product },
            session_id,
        });

        if (res) throw new BadRequestException('product is already added to wishlist');

        try {
            await this.wishlistRepo.save({ product, session_id } as DeepPartial<WishlistEntity>);

            return this.geWishListT(session_id);
        } catch (err) {
            throw new NotFoundException('product not found');
        }
    }

    async removeItem(product: ProductI['id'], session_id: SessionI['id']): Promise<WishListTPublicT> {
        await this.wishlistRepo.delete({
            product: { id: product },
            session_id,
        });

        return this.geWishListT(session_id);
    }

    async clearWishlist(session_id: SessionI['id']): Promise<DeleteResult> {
        return this.wishlistRepo.delete({ session_id });
    }
}
