'use server'

import { WishlistItemModel } from '@entities/wishlist/model/interfaces';
import { WishlistModel } from '@entities/wishlist/model/interfaces';
import { CreateWishlistDTO, UpdateWishlistDTO, WishlistItemChangeWishlistDTO } from './dto';
import serverAPI from '@shared/api/serverApi';

export async function createWishlist(wishlist: CreateWishlistDTO): Promise<WishlistModel> {
    return (await serverAPI.post<WishlistModel>('/wishlist', wishlist)).data;
}

export async function updateWishlist(wishlistId: WishlistModel['id'], updates: UpdateWishlistDTO): Promise<void> {
    return (await serverAPI.patch(`/wishlist/${wishlistId}`, updates)).data;
}

export async function removeWishlist(wishlistId: WishlistModel['id']): Promise<void> {
    return (await serverAPI.delete(`/wishlist/${wishlistId}`)).data;
}

export async function addWishlistItem(wishlistItemId: WishlistItemModel['id']): Promise<WishlistItemModel> {
    return (await serverAPI.post<WishlistItemModel>(`/wishlist/item/${wishlistItemId}`)).data;
}

export async function moveWishlistItem(updates: WishlistItemChangeWishlistDTO): Promise<void> {
    return (await serverAPI.patch<void>(`/wishlist/item`, updates)).data;
}

export async function removeWishlistItem(wishlistItemId: WishlistItemModel['id']): Promise<void> {
    return (await serverAPI.delete(`/wishlist/item/${wishlistItemId}`)).data;
}
