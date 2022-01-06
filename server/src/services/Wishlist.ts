import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import WishlistEntity from '@entities/Wishlist';
import { IProduct, IProductPreview } from '@interfaces/Product';
import { ISession } from '@interfaces/Session';
import { ProductPreviewDTO } from '@dto/Product';

@Injectable()
export default class WishlistService {
    constructor(
        @InjectRepository(WishlistEntity) public readonly wishlistRepo: Repository<WishlistEntity>
    ) {}

    async addItem(
        productId: IProduct['id'],
        session_id: ISession['id']
    ): Promise<IProductPreview[]> {
        //@ts-ignore
        const res = await this.wishlistRepo.findOne({ session_id, product: productId });

        if (res) throw new NotAcceptableException('product already exist');

        try {
            //@ts-ignore
            await this.wishlistRepo.save({ product: productId, session_id });

            return this.getWishlist(session_id);
        } catch(err) {
            throw new BadRequestException('product not found');
        }
    }

    async getWishlist(session_id: ISession['id']): Promise<IProductPreview[]> {
        const res = await this.wishlistRepo.find({
            where: { session_id },
            relations: [ 'product' ]
        });

        if (!res.length) return [];

        //@ts-ignore
        return res.map(({ product }) => new ProductPreviewDTO(product));
    }

    async removeItem(
        productId: IProduct['id'],
        session_id: ISession['id']
    ): Promise<IProductPreview[]> {
        //@ts-ignore
        await this.wishlistRepo.delete({ product: productId, session_id });

        return this.getWishlist(session_id);
    }

    clearUselessWishlist() {
        console.log(111);
    }
}
