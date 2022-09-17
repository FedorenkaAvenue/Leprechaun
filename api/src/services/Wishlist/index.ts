import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

import { IProduct } from '@interfaces/Product';
import { ISession } from '@interfaces/Session';
import { TWishListPublic } from '@interfaces/Wishlist';
import WishlistAdminService from './admin';
import WishlistEntity from '@entities/Wishlist';

@Injectable()
export default class WishlistService extends WishlistAdminService {
    async addItem(product: IProduct['id'], session_id: ISession['id']): Promise<TWishListPublic> {
        const res = await this.wishlistRepo.findOneBy({
            product: { id: product },
            session_id
        });

        if (res) throw new BadRequestException('product is already added to wishlist');

        try {
            await this.wishlistRepo.save({ product, session_id } as DeepPartial<WishlistEntity>);

            return this.getWishlist(session_id);
        } catch (err) {
            throw new NotFoundException('product not found');
        }
    }

    async removeItem(product: IProduct['id'], session_id: ISession['id']): Promise<TWishListPublic> {
        await this.wishlistRepo.delete({
            product: { id : product },
            session_id
        });

        return this.getWishlist(session_id);
    }
}
