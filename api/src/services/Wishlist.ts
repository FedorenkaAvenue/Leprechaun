import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import WishlistEntity from '@entities/Wishlist';
import { IProduct } from '@interfaces/Product';
import { ISession } from '@interfaces/Session';
import { PRODUCT_RELATIONS } from './Product';
import { ProductEntity } from '@entities/Product';
import { ProductPublic } from '@dto/Product/constructor';
import { TWishListPublic } from '@interfaces/Wishlist';

@Injectable()
export default class WishlistService {
    constructor(
        @InjectRepository(WishlistEntity) public readonly wishlistRepo: Repository<WishlistEntity>
    ) {}

    // COTROLLERS

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

    async getWishlist(session_id: ISession['id']): Promise<TWishListPublic> {
        const wishlist = await this.wishlistRepo.find({
            where: { session_id },
            relations: PRODUCT_RELATIONS
        });

        return wishlist.map(({ product }) => new ProductPublic(product));
    }

    async removeItem(
        product: IProduct['id'],
        session_id: ISession['id']
    ): Promise<TWishListPublic> {
        await this.wishlistRepo.delete({ product, session_id } as DeepPartial<ProductEntity>);

        return this.getWishlist(session_id);
    }

    // HELPERS

    clearUselessWishlist() {
        console.log(111);
    }
}
