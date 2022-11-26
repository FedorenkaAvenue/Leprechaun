import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, DeleteResult, FindOptionsOrder } from 'typeorm';

import { ProductI } from '@interfaces/Product';
import { SessionI } from '@interfaces/Session';
import WishlistService from '.';
import WishlistItemEntity from '@entities/WishlistItem';
import { WishlistItemI } from '@interfaces/WishlistItem';
import { WishlistItemPublic } from '@dto/WishlistItem/constructor';
import { QueriesI } from '@interfaces/Queries';
import { PRODUCT_DEEP_RELATIONS } from '@constants/relations';
import { PaginationResult } from '@dto/Pagination/constructor';
import { SortE } from '@enums/Query';

@Injectable()
export default class WishlistPublicService extends WishlistService {
    async getWishlist(
        sid: SessionI['sid'],
        { portion, page, sort }: QueriesI,
    ): Promise<PaginationResult<WishlistItemPublic>> {
        let sorting: FindOptionsOrder<WishlistItemEntity>;

        switch (sort) {
            case SortE.PRICE_UP: {
                sorting = { product: { price: { current: 'ASC' } } };
                break;
            }

            case SortE.PRICE_DOWN: {
                sorting = { product: { price: { current: 'DESC' } } };
                break;
            }

            default:
                sorting = { created_at: 'ASC' };
        }

        const [result, resCount] = await this.wishlistItemRepo.findAndCount({
            where: { sid },
            relations: PRODUCT_DEEP_RELATIONS,
            order: sorting,
            take: portion,
            skip: (page - 1) * portion,
        });

        return new PaginationResult<WishlistItemPublic>(
            result.map(item => new WishlistItemPublic(item)),
            {
                currentPage: page,
                totalCount: resCount,
                itemPortion: portion,
            },
        );
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
