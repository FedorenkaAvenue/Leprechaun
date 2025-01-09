import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    addProductToWishlist, createWishlist, removeProductFromWishlist, removeWishlist, updateWishlist,
} from "../api";
import { WISHLISTS_QUERY } from "@entities/wishlist/constants/queryKeys";
import { WishlistItemModel } from "@entities/wishlist/model/interfaces";
import { WishlistModel } from "@entities/wishlist/model/interfaces";
import { CreateWishlistDTO, UpdateWishlistDTO } from "../api/dto";

export function useCreateWishlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (wishlist: CreateWishlistDTO) => createWishlist(wishlist),
        onSuccess: res => {
            const wishlists = queryClient.getQueryData<WishlistModel[]>([WISHLISTS_QUERY]);

            if (!wishlists) return queryClient.refetchQueries({ queryKey: [WISHLISTS_QUERY] });

            if (res.isDefault) {
                const defaultWishlist = wishlists?.find(({ isDefault }) => isDefault);

                queryClient.setQueryData(
                    [WISHLISTS_QUERY],
                    [
                        ...wishlists?.filter(({ isDefault }) => !isDefault),
                        { ...defaultWishlist, isDefault: false },
                        res,
                    ],
                );
            } else {
                queryClient.setQueryData([WISHLISTS_QUERY], [...wishlists, res]);
            }
        }
    });
}

export function useUpdateWishlist(wishlistId: WishlistModel['id']) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updates: UpdateWishlistDTO) => updateWishlist(wishlistId, updates),
        onMutate: (updates) => {
            const wishlists = queryClient.getQueryData<WishlistModel[]>([WISHLISTS_QUERY]);
            const updatedWishlist = wishlists?.find(({ id }) => wishlistId === id);

            if (!wishlists) {
                queryClient.refetchQueries({ queryKey: [WISHLISTS_QUERY] });

                return;
            }

            if (!updatedWishlist?.isDefault && updates.isDefault) {
                const defaultWishlist = wishlists?.find(({ isDefault }) => isDefault);

                queryClient.setQueryData(
                    [WISHLISTS_QUERY],
                    [
                        ...wishlists?.filter(({ isDefault, id }) => !isDefault && id !== wishlistId),
                        { ...updatedWishlist, ...updates },
                        { ...defaultWishlist, isDefault: false },
                    ],
                );
            } else {
                queryClient.setQueryData(
                    [WISHLISTS_QUERY],
                    [
                        ...wishlists?.filter(({ id }) => id !== wishlistId),
                        { ...updatedWishlist, ...updates },
                    ],
                );
            }

            return wishlists;
        },
        onError: (err, _, prevData) => {
            queryClient.setQueryData([WISHLISTS_QUERY], prevData);
        },
    });
}

export function useRemoveWishlist(wishlistId: WishlistModel['id']) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => removeWishlist(wishlistId),
        onMutate: () => {
            const wishlists = queryClient.getQueryData<WishlistModel[]>([WISHLISTS_QUERY]);

            queryClient.setQueryData([WISHLISTS_QUERY], wishlists?.filter(({ id }) => id !== wishlistId));

            return wishlists;
        },
        onError: (err, _, prevData) => {
            queryClient.setQueryData([WISHLISTS_QUERY], prevData);
        },
    });
}

export function useAddProductToWishlist(wishlistItemId: WishlistItemModel['id']) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => addProductToWishlist(wishlistItemId),
        onSuccess: res => {
            const wishlists = queryClient.getQueryData<WishlistModel[]>([WISHLISTS_QUERY]);

            if (wishlists && wishlists.length > 0) { // for new users
                const currWishlist = wishlists.find(({ isDefault }) => isDefault) as WishlistModel;
                const updWislist = {
                    ...currWishlist,
                    items_updated_at: new Date(),
                    items: [...currWishlist.items, res],
                };

                queryClient.setQueryData(
                    [WISHLISTS_QUERY],
                    [...wishlists?.filter(({ isDefault }) => !isDefault), updWislist],
                )
            } else {
                queryClient.refetchQueries({ queryKey: [WISHLISTS_QUERY] });
            }
        },
    });
}

export function useRemoveProductFromWishlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (wishlistItemId: WishlistItemModel['id']) => removeProductFromWishlist(wishlistItemId),
        onMutate: wishlistItemId => {
            const wishlists = queryClient.getQueryData<WishlistModel[]>([WISHLISTS_QUERY]);

            queryClient.setQueryData(
                [WISHLISTS_QUERY],
                wishlists?.map<WishlistModel>(w => ({
                    ...w,
                    items: w.items.filter(({ id }) => id !== wishlistItemId),
                })),
            );

            return wishlists;
        },
        onError: (err, _, prevData) => {
            queryClient.setQueryData([WISHLISTS_QUERY], prevData);
        },
    });
}
