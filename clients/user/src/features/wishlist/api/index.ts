import clientAPI from "@shared/lib/api_client";
import { WishlistItemModel } from "@entities/wishlist/models/WishlistItem";

export async function addProductToWishlist(wishlistItemId: WishlistItemModel['id']) {
    const res = await clientAPI.post(`/wishlist/item/${wishlistItemId}`);

    return res.data;
}

export async function removeProductFromWishlist(wishlistItemId: WishlistItemModel['id'] | undefined) {
    return await clientAPI.delete(`/wishlist/item/${wishlistItemId}`);
}
