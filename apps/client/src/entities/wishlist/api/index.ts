'use server';

import { WishlistPublic } from '@gen/wishlist';
import serverAPI from '@shared/api/serverApi';

export async function getWishLists(): Promise<WishlistPublic[]> {
    return (await serverAPI.get<WishlistPublic[]>('/wishlist')).data;
}

export async function getWishlist(wishlistId: WishlistPublic['id']): Promise<WishlistPublic> {
    return (await serverAPI.get<WishlistPublic>(`/wishlist/${wishlistId}`)).data;
}
