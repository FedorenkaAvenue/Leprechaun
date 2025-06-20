import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';

import { WISHLIST_PACKAGE } from './wishlist.constants';
import { WISHLIST_SERVICE_NAME, WishlistPublic, WishlistServiceClient } from '@gen/wishlist';
import { catchResponceError } from '@pipes/operators';
import { User } from '@gen/user';
import { QueryCommonParams } from '@gen/common';

@Injectable()
export default class WishlistPublicService implements OnModuleInit {
    private wishlistClient: WishlistServiceClient;

    constructor(@Inject(WISHLIST_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.wishlistClient = this.client.getService<WishlistServiceClient>(WISHLIST_SERVICE_NAME);
    }

    public async getWishlists(user: User['id'], params: QueryCommonParams): Promise<WishlistPublic[]> {
        return lastValueFrom(
            this.wishlistClient.getWishlistListPublic({ userId: user, queries: params }).pipe(
                map(res => res.items),
                catchResponceError,
            )
        );
    }

    // public async getWishlist(id: WishlistI['id'], searchParams: QueriesCommonI): Promise<WishlistPublicI | null> {
    //     const res = await this.wishlistRepo.findOne({
    //         where: { id },
    //         relations: { items: { product: { images: true } } },
    //     });

    //     if (!res) return null;

    //     return new WishlistPublic(res, searchParams);
    // }

    // public async createWishlist(
    //     wishlist: CreateWishlistDTO,
    //     sid: SessionI['sid'],
    //     searchParams: QueriesCommonI,
    // ): Promise<WishlistPublic> {
    //     const newWishlist = await this.dataSource.transaction(async manager => {
    //         if (wishlist.isDefault) await manager.update(WishlistEntity, { sid, isDefault: true }, { isDefault: false });

    //         return await manager.save(WishlistEntity, { ...wishlist, sid });
    //     });

    //     return new WishlistPublic({ ...newWishlist, items: [] }, searchParams);
    // }

    // public async updateWishlist(
    //     wishlistId: WishlistI['id'],
    //     updates: UpdateWishlistDTO,
    //     sid: SessionI['sid'],
    // ): Promise<UpdateResult> {
    //     return await this.dataSource.transaction(async manager => {
    //         if (updates.isDefault) await manager.update(WishlistEntity, { sid, isDefault: true }, { isDefault: false });

    //         return await manager.update(WishlistEntity, { sid, id: wishlistId }, { ...updates });
    //     });
    // }

    // public async removeWishlist(
    //     wishlistId: WishlistI['id'],
    //     sid: SessionI['sid'],
    // ): Promise<DeleteResult> {
    //     return await this.wishlistRepo.delete({ sid, id: wishlistId, isDefault: false });
    // }
}
