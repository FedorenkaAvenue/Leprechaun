import { Injectable, NotAcceptableException } from '@nestjs/common';
import { DeepPartial, DeleteResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { SessionI } from '@interfaces/Session';
import WishlistService from '.';
import WishlistItemEntity from '@entities/WishlistItem';
import { WishlistItemI } from '@interfaces/WishlistItem';
import { WishlistItemMoveDTO, WishlistItemPublic } from '@dto/WishlistItem/public';
import { CreateWishlistDTO, UpdateWishlistDTO, WishlistPublic } from '@dto/Wishlist/public';
import { WishlistI, WishlistPublicI } from '@interfaces/Wishlist';
import { ProductI } from '@interfaces/Product';
import WishlistEntity from '@entities/Wishlist';
import { QueriesCommonI } from '@interfaces/Queries';

@Injectable()
export default class WishlistPublicService extends WishlistService {
    public async getWishlists(sid: SessionI['sid'], searchParams: QueriesCommonI): Promise<WishlistPublicI[]> {
        const result = await this.wishlistRepo.find({
            where: { sid },
            relations: { items: { product: { images: true } } },
        });

        return result.map(item => new WishlistPublic(item, searchParams));
    }

    public async getWishlist(id: WishlistI['id'], searchParams: QueriesCommonI): Promise<WishlistPublicI | null> {
        const res = await this.wishlistRepo.findOne({
            where: { id },
            relations: { items: { product: { images: true } } },
        });

        if (!res) return null;

        return new WishlistPublic(res, searchParams);
    }

    public async createWishlist(
        wishlist: CreateWishlistDTO,
        sid: SessionI['sid'],
        searchParams: QueriesCommonI,
    ): Promise<WishlistPublic> {
        const newWishlist = await this.dataSource.transaction(async manager => {
            if (wishlist.isDefault) await manager.update(WishlistEntity, { sid, isDefault: true }, { isDefault: false });

            return await manager.save(WishlistEntity, { ...wishlist, sid });
        });

        return new WishlistPublic({ ...newWishlist, items: [] }, searchParams);
    }

    public async updateWishlist(
        wishlistId: WishlistI['id'],
        updates: UpdateWishlistDTO,
        sid: SessionI['sid'],
    ): Promise<UpdateResult> {
        return await this.dataSource.transaction(async manager => {
            if (updates.isDefault) await manager.update(WishlistEntity, { sid, isDefault: true }, { isDefault: false });

            return await manager.update(WishlistEntity, { sid, id: wishlistId }, { ...updates });
        });
    }

    public async removeWishlist(
        wishlistId: WishlistI['id'],
        sid: SessionI['sid'],
    ): Promise<DeleteResult> {
        return await this.wishlistRepo.delete({ sid, id: wishlistId, isDefault: false });
    }

    public async addWishlistItem(
        productId: ProductI['id'],
        sid: SessionI['sid'],
        searchParams: QueriesCommonI,
    ): Promise<WishlistItemPublic> {
        let wishlist: WishlistI['id'];

        try { // check if default exists
            const { id } = await this.wishlistRepo.findOneOrFail({ where: { sid, isDefault: true } });

            wishlist = id;
        } catch (_) {
            const { id } = await this.wishlistRepo.save({ isDefault: true, sid });

            wishlist = id;
        }

        const { raw } = await this.wishlistItemRepo.upsert(
            { product: productId, wishlist } as DeepPartial<WishlistItemEntity>,
            {
                conflictPaths: { product: true, wishlist: true },
                skipUpdateIfNoValuesChanged: true,
            }
        );

        if (raw.length === 0) throw new NotAcceptableException('wishlist item already exists');

        const addedItem = await this.wishlistItemRepo.findOne({
            where: { id: raw[0].id },
            relations: { product: { images: true } },
        }) as WishlistItemEntity;

        return new WishlistItemPublic(addedItem, searchParams);
    }

    public async moveWishlistItems(updates: WishlistItemMoveDTO): Promise<void> {
        const { raw } = await this.wishlistItemRepo.upsert(
            { id: updates.itemId, wishlist: updates.wishlistId as QueryDeepPartialEntity<WishlistEntity> },
            { conflictPaths: { id: true } },
        );

        if (raw.length === 0) throw new NotAcceptableException('wishlist item or wishlist is not exists');
    }

    public async removeWishlistItem(id: WishlistItemI['id'], sid: SessionI['sid']): Promise<DeleteResult> {
        return await this.wishlistItemRepo.delete({ id });
    }
}
