import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';

import { WISHLIST_PACKAGE } from './wishlist.constants';
import {
    Wishlist,
    WISHLIST_SERVICE_NAME,
    WishlistItem,
    WishlistItemMoveParams,
    WishlistItemPublic,
    WishlistPublic,
    WishlistServiceClient,
} from '@gen/wishlist';
import { catchResponceError } from '@pipes/operators';
import { User } from '@gen/user';
import { QueryCommonParams } from '@gen/common';
import { WishlistCreateSchema, WishlistUpdateSchema } from './wishlist.schema';
import { Empty } from '@gen/google/protobuf/empty';

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

    public async getWishlist(id: Wishlist['id'], queries: QueryCommonParams): Promise<WishlistPublic> {
        return await lastValueFrom(this.wishlistClient.getWishlistPublic({ id, queries }).pipe(catchResponceError));
    }

    public async createWishlist(newWishlist: WishlistCreateSchema, user: User['id']): Promise<WishlistPublic> {
        return lastValueFrom(
            this.wishlistClient.createWishlistPublic({ ...newWishlist, user }).pipe(catchResponceError)
        );
    }

    public async updateWishlist(
        wishlist: Wishlist['id'],
        user: User['id'],
        updates: WishlistUpdateSchema,
    ): Promise<Empty> {
        return await lastValueFrom(
            this.wishlistClient.updateWishlistPublic({ wishlist, user, updates }).pipe(catchResponceError)
        )
    }

    public async deleteWishlist(wishlistId: Wishlist['id'], user: User['id']): Promise<Empty> {
        return await lastValueFrom(
            this.wishlistClient.deleteWishlist({ id: wishlistId, user }).pipe(catchResponceError)
        );
    }

    public async addWishlistItem(
        user: User['id'],
        product: string,
        queries: QueryCommonParams,
    ): Promise<WishlistItemPublic> {
        return lastValueFrom(
            this.wishlistClient.addWishlistItemPublic({ product, user, queries }).pipe(catchResponceError)
        );
    }

    public deleteWishlistItem(id: WishlistItem['id'], user: User['id']): Promise<Empty> {
        return lastValueFrom(this.wishlistClient.deleteWishlistItem({ id, user }).pipe(catchResponceError));
    }

    public moveWishlistItems(updates: WishlistItemMoveParams): Promise<Empty> {
        return lastValueFrom(this.wishlistClient.moveWishlistItem(updates).pipe(catchResponceError));
    }
}
