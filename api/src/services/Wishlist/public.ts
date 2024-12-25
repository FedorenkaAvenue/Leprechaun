import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, DeleteResult } from 'typeorm';

import { SessionI } from '@interfaces/Session';
import WishlistService from '.';
import WishlistItemEntity from '@entities/WishlistItem';
import { WishlistItemI } from '@interfaces/WishlistItem';
import { WishlistItemPublic } from '@dto/WishlistItem/public';
import { QueriesWishlist } from '@dto/Queries/constructor';
import { WishlistPublic } from '@dto/Wishlist/public';
import { QueriesWishlistI } from '@interfaces/Queries';
import { WishlistI } from '@interfaces/Wishlist';
import { ProductI } from '@interfaces/Product';

@Injectable()
export default class WishlistPublicService extends WishlistService {
    public async getWishlists(sid: SessionI['sid'], searchParams: QueriesWishlistI): Promise<WishlistPublic[]> {
        const result = await this.wishlistRepo.find({
            where: { sid },
            relations: { items: { product: { images: true } } },
        });

        return result.map(item => new WishlistPublic(item, searchParams));
    }

    // public async getWishlists(sid: SessionI['sid'], searchParams: QueriesCommon): Promise<WishlistItemPublic[]> {
    //     let sorting: FindOptionsOrder<WishlistItemEntity>;

    //     switch (searchParams.sort) {
    //         case SortWishlistE.PRICE_UP: {
    //             sorting = { product: { price: { current: 'ASC' } } };
    //             break;
    //         }

    //         case SortWishlistE.PRICE_DOWN: {
    //             sorting = { product: { price: { current: 'DESC' } } };
    //             break;
    //         }

    //         default: // SortWishlistE.LATEST
    //             sorting = { created_at: 'ASC' };
    //     }

    //     const result = await this.wishlistItemRepo.find({
    //         where: { sid },
    //         relations: { product: { images: true } },
    //         order: sorting,
    //         take: this.wishlistLength,
    //     });

    //     return result.map(item => new WishlistItemPublic(item, searchParams));
    // }

    // TODO: refactoring
    public async addWishlistItem(
        productId: ProductI['id'],
        sid: SessionI['sid'],
        searchParams: QueriesWishlist,
    ): Promise<WishlistItemPublic> {
        let wishlist: WishlistI['id'];

        try { // check if default exists
            const { id } = await this.wishlistRepo.findOneOrFail({ where: { sid, isDefault: true } });

            wishlist = id;
        } catch (_) {
            const { id } = await this.wishlistRepo.save({ isDefault: true, sid });

            wishlist = id;
        }

        try {
            const { id } = await this.wishlistItemRepo.save({
                product: productId, wishlist,
            } as DeepPartial<WishlistItemEntity>);
            const addedItem = await this.wishlistItemRepo.findOne({
                where: { id },
                relations: { product: { images: true } },
            });

            return new WishlistItemPublic(addedItem, searchParams);
        } catch (_) {
            throw new NotFoundException('product or wishlist not found');
        }
    }

    public async removeItem(id: WishlistItemI['id'], sid: SessionI['sid']): Promise<DeleteResult> {
        return await this.wishlistItemRepo.delete({ id });
    }

    // public async clearWishlist(sid: SessionI['sid']): Promise<DeleteResult> {
    //     return this.wishlistItemRepo.delete({ sid });
    // }
}
