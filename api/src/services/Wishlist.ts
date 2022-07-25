import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import WishlistEntity from '@entities/Wishlist';
import { IProduct, IPublicProduct } from '@interfaces/Product';
import { ISession } from '@interfaces/Session';
import { PRODUCT_RELATIONS } from './Product';
import { ProductEntity } from '@entities/Product';
import { PublicProduct } from '@dto/Product/constructor';

@Injectable()
export default class WishlistService {
    constructor(
        @InjectRepository(WishlistEntity) public readonly wishlistRepo: Repository<WishlistEntity>
    ) {}

    // COTROLLERS

    async addItem(
        product: IProduct['id'],
        session_id: ISession['id']
    ): Promise<IPublicProduct[]> {
        try {
            await this.wishlistRepo.save({ product, session_id } as DeepPartial<ProductEntity>);

            return this.getWishlist(session_id);
        } catch(err) {
            throw new BadRequestException('product not found');
        }
    }

    async getWishlist(session_id: ISession['id']): Promise<IPublicProduct[]> {
        const wishlist = await this.wishlistRepo.find({
            where: { session_id },
            relations: PRODUCT_RELATIONS
        });

        return wishlist.map(({ product }) => new PublicProduct(product));
    }

    async removeItem(
        product: IProduct['id'],
        session_id: ISession['id']
    ): Promise<IPublicProduct[]> {
        await this.wishlistRepo.delete({ product, session_id } as DeepPartial<ProductEntity>);

        return this.getWishlist(session_id);
    }

    // HELPERS

    clearUselessWishlist() {
        console.log(111);
    }
}
