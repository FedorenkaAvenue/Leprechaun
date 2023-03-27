import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, DeleteResult, FindOptionsOrder } from 'typeorm';

import { ProductI } from '@interfaces/Product';
import { SessionI } from '@interfaces/Session';
import WishlistService from '.';
import WishlistItemEntity from '@entities/WishlistItem';
import { WishlistItemI } from '@interfaces/WishlistItem';
import { WishlistItemPublic } from '@dto/WishlistItem/constructor';
import { SortWishlistE } from '@enums/Query';
import configService from '@services/Config';
import { QueriesWishlist } from '@dto/Queries/constructor';

const USER_WISHLIST_LENGTH = Number(configService.getVal('USER_WISHLIST_LENGTH'));

@Injectable()
export default class WishlistPublicService extends WishlistService {
    public async getWishlist(sid: SessionI['sid'], searchParams: QueriesWishlist): Promise<WishlistItemPublic[]> {
        let sorting: FindOptionsOrder<WishlistItemEntity>;

        switch (searchParams.sort) {
            case SortWishlistE.PRICE_UP: {
                sorting = { product: { price: { current: 'ASC' } } };
                break;
            }

            case SortWishlistE.PRICE_DOWN: {
                sorting = { product: { price: { current: 'DESC' } } };
                break;
            }

            default: // SortWishlistE.LATEST
                sorting = { created_at: 'ASC' };
        }

        const result = await this.wishlistItemRepo.find({
            where: { sid },
            relations: ['product'],
            order: sorting,
            take: USER_WISHLIST_LENGTH,
        });

        return result.map(item => new WishlistItemPublic(item, searchParams));
    }

    public async addItem(
        product: ProductI['id'],
        sid: SessionI['sid'],
        searchParams: QueriesWishlist,
    ): Promise<WishlistItemPublic> {
        const res = await this.wishlistItemRepo.findOneBy({
            product: { id: product },
            sid,
        });

        if (res) throw new BadRequestException('product is already added to wishlist');

        try {
            const { id } = await this.wishlistItemRepo.save({ product, sid } as DeepPartial<WishlistItemEntity>);
            const addedItem = await this.wishlistItemRepo.findOne({
                where: { id },
                relations: ['product'],
            });

            return new WishlistItemPublic(addedItem, searchParams);
        } catch (_) {
            throw new NotFoundException('product not found');
        }
    }

    public async removeItem(sid: SessionI['sid'], id: WishlistItemI['id']): Promise<DeleteResult> {
        return await this.wishlistItemRepo.delete({ sid, id });
    }

    public async clearWishlist(sid: SessionI['sid']): Promise<DeleteResult> {
        return this.wishlistItemRepo.delete({ sid });
    }
}
