'use server';

import serverAPI from '@shared/api/serverApi';
import { WishlistModel } from '../model/interfaces';

export async function getWishLists(): Promise<WishlistModel[]> {
    return (await serverAPI.get<WishlistModel[]>('/wishlist')).data;
}

export async function getWishlist(wishlistId: WishlistModel['id']): Promise<WishlistModel> {
    return (await serverAPI.get<WishlistModel>(`/wishlist/${wishlistId}`)).data;
}
