import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { WishlistPublicI } from './wishlist.interface';
import { CreateWishlistDTO, UpdateWishlistDTO, WishlistPublic } from './wishlist.dto';
import { QueriesCommonI } from '@core/queries/queries.interface';
import { SessionI } from '@core/session/session.interface';
import WishlistEntity from '@core/wishlist/wishlist.entity';
import { WishlistI } from '@core/wishlist/wishlist.interface';

@Injectable()
export default class WishlistService {
    constructor(
        protected dataSource: DataSource,
        @InjectRepository(WishlistEntity) public readonly wishlistRepo: Repository<WishlistEntity>,
    ) { }

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
}
