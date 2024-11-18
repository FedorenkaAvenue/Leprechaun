import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToWishlist, removeProductFromWishlist } from ".";
import { ProductCardModel } from "@entities/product/models/Product";
import { WISHLIST_QUERY } from "@entities/wishlist/constants/queryKeys";
import { WishListItemModel } from "@entities/wishlist/models/WishList";

export function useAddProductToWishlist(productId: ProductCardModel['id']) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => addProductToWishlist(productId),
        onSuccess: (res) => {
            const wishlist = queryClient.getQueryData<WishListItemModel[]>([WISHLIST_QUERY]);
            queryClient.setQueryData([WISHLIST_QUERY], [...wishlist as WishListItemModel[], res])
        }
    });
}

export function useRemoveProductToWishlist(wishlistItemId: WishListItemModel['id'] | undefined) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => removeProductFromWishlist(wishlistItemId),
        onSuccess: () => {
            const wishlist = queryClient.getQueryData<WishListItemModel[]>([WISHLIST_QUERY]);
            queryClient.setQueryData([WISHLIST_QUERY], wishlist?.filter(i => i.id !== wishlistItemId));
        }
    });
}
