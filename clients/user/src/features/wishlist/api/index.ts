import { ProductCardModel } from "@entities/product/models/Product";
import { WishListItemModel } from "@entities/wishlist/models/WishList";
import clientAPI from "@shared/lib/api_client";

export async function addProductToWishlist(id: ProductCardModel['id']) {
    const res = await clientAPI.post(`/wishlist/${id}`);

    return res.data;
}

export async function removeProductFromWishlist(wishlistItemId: WishListItemModel['id'] | undefined) {
    return await clientAPI.delete(`/wishlist/${wishlistItemId}`);
}
