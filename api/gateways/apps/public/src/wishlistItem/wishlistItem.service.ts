import { Injectable, NotAcceptableException } from '@nestjs/common';
import { DataSource, DeepPartial, DeleteResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { InjectRepository } from '@nestjs/typeorm';

import { WishlistItemMoveDTO, WishlistItemPublic } from '../wishlistItem/wishlistItem.dto';
import { QueriesCommonI } from '@core/queries/queries.interface';
import { SessionI } from '@core/session/session.interface';
import WishlistEntity from '@core/wishlist/wishlist.entity';
import WishlistItemEntity from '@core/wishlistItem/wishlistItem.entity';
import { WishlistI } from '@core/wishlist/wishlist.interface';
import { ProductI } from '@core/product/product.interface';
import { WishlistItemI } from '@core/wishlistItem/wishlistItem.interface';

@Injectable()
export default class WishlistItemService {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(WishlistEntity) private readonly wishlistRepo: Repository<WishlistEntity>,
        @InjectRepository(WishlistItemEntity) private readonly wishlistItemRepo: Repository<WishlistItemEntity>,
    ) { }

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
