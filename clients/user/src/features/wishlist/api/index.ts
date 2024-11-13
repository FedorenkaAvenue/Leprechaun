import { ProductCardModel } from "@entities/product/models/Product";
import { WishListItemModel } from "@entities/wishlist/models/WishList";
import { clientAPI } from "@shared/lib/api";

export async function addProductToFavorite(id: ProductCardModel['id']) {
    const res = await clientAPI.post(`/wishlist/${id}`);

    return res.data;
}

export async function removeProductFromFavorite(wishlistItemId: WishListItemModel['id'] | undefined) {
    return await clientAPI.delete(`/wishlist/${wishlistItemId}`);
}
