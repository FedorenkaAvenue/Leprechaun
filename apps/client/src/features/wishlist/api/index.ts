'use server'

import { WishlistItemPublic, WishlistPublic } from '@gen/wishlist';
import { CreateWishlistDTO, UpdateWishlistDTO, WishlistItemChangeWishlistDTO } from './dto';
import serverAPI from '@shared/api/serverApi';

export async function createWishlist(wishlist: CreateWishlistDTO): Promise<WishlistPublic> {
    return (await serverAPI.post<WishlistPublic>('/wishlist', wishlist)).data;
}

export async function updateWishlist(wishlistId: WishlistPublic['id'], updates: UpdateWishlistDTO): Promise<void> {
    return (await serverAPI.patch(`/wishlist/${wishlistId}`, updates)).data;
}

export async function removeWishlist(wishlistId: WishlistPublic['id']): Promise<void> {
    return (await serverAPI.delete(`/wishlist/${wishlistId}`)).data;
}

export async function addWishlistItem(wishlistItemId: WishlistItemPublic['id']): Promise<WishlistItemPublic> {
    return (await serverAPI.post<WishlistItemPublic>(`/wishlist/item/${wishlistItemId}`)).data;
}

export async function moveWishlistItem(updates: WishlistItemChangeWishlistDTO): Promise<void> {
    return (await serverAPI.patch<void>(`/wishlist/item`, updates)).data;
}

export async function removeWishlistItem(wishlistItemId: WishlistItemPublic['id']): Promise<void> {
    return (await serverAPI.delete(`/wishlist/item/${wishlistItemId}`)).data;
}
