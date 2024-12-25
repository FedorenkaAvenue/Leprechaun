import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToWishlist, removeProductFromWishlist } from ".";
import { WISHLISTS_QUERY } from "@entities/wishlist/constants/queryKeys";
import { WishlistItemModel } from "@entities/wishlist/models/WishlistItem";
import { WishlistModel } from "@entities/wishlist/models/WishList";

export function useAddProductToWishlist(wishlistItemId: WishlistItemModel['id']) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => addProductToWishlist(wishlistItemId),
        onSuccess: res => {
            const wishlists = queryClient.getQueryData<WishlistModel[]>([WISHLISTS_QUERY]);

            if (wishlists && wishlists.length > 0) {
                const currWishlist = wishlists.find(({ isDefault }) => isDefault) as WishlistModel;
                const updWislist = { ...currWishlist, items: [...currWishlist.items, res] };

                queryClient.setQueryData(
                    [WISHLISTS_QUERY],
                    [...wishlists?.filter(({ isDefault }) => !isDefault), updWislist],
                )
            } else {
                queryClient.invalidateQueries({ queryKey: [WISHLISTS_QUERY] });
            }
        },
    });
}

export function useRemoveProductFromWishlist(wishlistItemId: WishlistItemModel['id'] | undefined) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => removeProductFromWishlist(wishlistItemId),
        onSuccess: () => {
            const wishlists = queryClient.getQueryData<WishlistModel[]>([WISHLISTS_QUERY]);
            queryClient.setQueryData(
                [WISHLISTS_QUERY],
                wishlists?.map<WishlistModel>(w => ({
                    ...w,
                    items: w.items.filter(({ id }) => id !== wishlistItemId),
                })),
            );
        }
    });
}
