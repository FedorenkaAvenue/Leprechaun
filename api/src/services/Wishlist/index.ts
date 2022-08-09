import { BadRequestException, Injectable } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere } from 'typeorm';

import { IProduct } from '@interfaces/Product';
import { ISession } from '@interfaces/Session';
import { ProductEntity } from '@entities/Product';
import { TWishListPublic } from '@interfaces/Wishlist';
import WishlistAdminService from './admin';

@Injectable()
export default class WishlistService extends WishlistAdminService {
    async addItem(
        product: IProduct['id'],
        session_id: ISession['id']
    ): Promise<TWishListPublic> {
        try {
            await this.wishlistRepo.save({ product, session_id } as DeepPartial<ProductEntity>);

            return this.getWishlist(session_id);
        } catch(err) {
            throw new BadRequestException('product not found');
        }
    }

    async removeItem(
        product: IProduct['id'],
        session_id: ISession['id']
    ): Promise<TWishListPublic> {
        await this.wishlistRepo.delete({ product, session_id } as FindOptionsWhere<ProductEntity>);

        return this.getWishlist(session_id);
    }
}
