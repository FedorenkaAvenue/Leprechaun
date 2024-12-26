import clientAPI from "@shared/api/api_client";
import { WishlistItemModel } from "@entities/wishlist/model/interfaces";
import { WishlistModel } from "@entities/wishlist/model/interfaces";
import { CreateWishlistDTO, UpdateWishlistDTO } from "./dto";

export async function createWishlist(wishlist: CreateWishlistDTO): Promise<WishlistModel> {
    const res = await clientAPI.post<WishlistModel>('/wishlist', wishlist);

    return res.data;
}

export async function updateWishlist(wishlistId: WishlistModel['id'], updates: UpdateWishlistDTO): Promise<void> {
    return await clientAPI.patch(`/wishlist/${wishlistId}`, updates);
}

export async function removeWishlist(wishlistId: WishlistModel['id']): Promise<void> {
    return await clientAPI.delete(`/wishlist/${wishlistId}`);
}

export async function addProductToWishlist(wishlistItemId: WishlistItemModel['id']): Promise<WishlistItemModel> {
    const res = await clientAPI.post<WishlistItemModel>(`/wishlist/item/${wishlistItemId}`);

    return res.data;
}

export async function removeProductFromWishlist(wishlistItemId: WishlistItemModel['id'] | undefined): Promise<void> {
    return await clientAPI.delete(`/wishlist/item/${wishlistItemId}`);
}

