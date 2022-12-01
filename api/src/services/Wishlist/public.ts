import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, DeleteResult, FindOptionsOrder } from 'typeorm';

import { ProductI } from '@interfaces/Product';
import { SessionI } from '@interfaces/Session';
import WishlistService from '.';
import WishlistItemEntity from '@entities/WishlistItem';
import { WishlistItemI } from '@interfaces/WishlistItem';
import { WishlistItemPublic } from '@dto/WishlistItem/constructor';
import { QueriesWishlistT } from '@interfaces/Queries';
import { PRODUCT_DEEP_RELATIONS } from '@constants/relations';
import { SortWishlistE } from '@enums/Query';
import configService from '@services/Config';

const USER_WISHLIST_LENGTH = Number(configService.getVal('USER_WISHLIST_LENGTH'));

@Injectable()
export default class WishlistPublicService extends WishlistService {
    async getWishlist(sid: SessionI['sid'], { sort }: QueriesWishlistT): Promise<WishlistItemPublic[]> {
        let sorting: FindOptionsOrder<WishlistItemEntity>;

        switch (sort) {
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
            relations: PRODUCT_DEEP_RELATIONS,
            order: sorting,
            take: USER_WISHLIST_LENGTH,
        });

        return result.map(item => new WishlistItemPublic(item));
    }

    async addItem(product: ProductI['id'], sid: SessionI['sid']): Promise<WishlistItemPublic> {
        const res = await this.wishlistItemRepo.findOneBy({
            product: { id: product },
            sid,
        });

        if (res) throw new BadRequestException('product is already added to wishlist');

        try {
            const { id } = await this.wishlistItemRepo.save({ product, sid } as DeepPartial<WishlistItemEntity>);
            const addedItem = await this.wishlistItemRepo.findOne({
                where: { id },
                relations: PRODUCT_DEEP_RELATIONS,
            });

            return new WishlistItemPublic(addedItem);
        } catch (_) {
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
