import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToFavorite, removeProductFromFavorite } from ".";
import { ProductCardModel } from "@entities/product/models/Product";
import { WISHLIST_QUERY } from "@entities/wishlist/constants/queryKeys";
import { WishListItemModel } from "@entities/wishlist/models/WishList";

export function useAddProductToFavorite(productId: ProductCardModel['id']) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => addProductToFavorite(productId),
        onSuccess: (res) => {
            const wishlist = queryClient.getQueryData<WishListItemModel[]>([WISHLIST_QUERY]);
            queryClient.setQueryData([WISHLIST_QUERY], [...wishlist as WishListItemModel[], res])
        }
    });
}

export function useRemoveProductToFavorite(wishlistItemId: WishListItemModel['id'] | undefined) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => removeProductFromFavorite(wishlistItemId),
        onSuccess: () => {
            const wishlist = queryClient.getQueryData<WishListItemModel[]>([WISHLIST_QUERY]);
            queryClient.setQueryData([WISHLIST_QUERY], wishlist?.filter(i => i.id !== wishlistItemId));
        }
    });
}
