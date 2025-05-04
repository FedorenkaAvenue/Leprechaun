import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
    addWishlistItem, createWishlist, removeWishlistItem, removeWishlist, updateWishlist, moveWishlistItem,
} from '../api';
import { WISHLISTS_QUERY } from '@entities/wishlist/constants/queryKeys';
import { WishlistItemModel } from '@entities/wishlist/model/interfaces';
import { WishlistModel } from '@entities/wishlist/model/interfaces';
import { CreateWishlistDTO, UpdateWishlistDTO, WishlistItemChangeWishlistDTO } from '../api/dto';

export function useCreateWishlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (wishlist: CreateWishlistDTO) => createWishlist(wishlist),
        onSuccess: res => {
            const wishlists = queryClient.getQueryData<WishlistModel[]>([WISHLISTS_QUERY]);

            if (!wishlists) return queryClient.refetchQueries({ queryKey: [WISHLISTS_QUERY] });

            if (res.isDefault) {
                const updatedWishlists = wishlists.reduce<WishlistModel[]>((acc, wishlist) => (
                    [
                        wishlist.isDefault ? { ...wishlist, isDefault: false } : wishlist,
                        ...acc,
                    ]
                ), []);

                queryClient.setQueryData([WISHLISTS_QUERY], [...updatedWishlists, res]);
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

            if (!wishlists) {
                queryClient.refetchQueries({ queryKey: [WISHLISTS_QUERY] });

                return;
            }

            const updatedWishlists = wishlists.reduce<WishlistModel[]>((acc, wishlist) => (
                [
                    wishlist.id === wishlistId
                        ? { ...wishlist, ...updates }
                        : (updates.isDefault && wishlist.isDefault)
                            ? { ...wishlist, isDefault: false }
                            : wishlist,
                    ...acc,
                ]
            ), []);

            queryClient.setQueryData([WISHLISTS_QUERY], updatedWishlists);

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

export function useAddWishlistItem(wishlistItemId: WishlistItemModel['id'], successCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => addWishlistItem(wishlistItemId),
        onSuccess: async res => {
            const wishlists = queryClient.getQueryData<WishlistModel[]>([WISHLISTS_QUERY]);

            if (wishlists && wishlists.length > 0) { // for existed users
                const updatedWishlists = wishlists.reduce<WishlistModel[]>((acc, wishlist) => (
                    [
                        wishlist.isDefault
                            ? { ...wishlist, items: [...wishlist.items, res] }
                            : wishlist,
                        ...acc,
                    ]
                ), []);

                queryClient.setQueryData([WISHLISTS_QUERY], updatedWishlists);
            } else {
                await queryClient.refetchQueries({ queryKey: [WISHLISTS_QUERY] });
            }

            successCallback?.call(null);
        }
    });
}

export function useMoveWishlistItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updates: WishlistItemChangeWishlistDTO) => moveWishlistItem(updates),
        onMutate: ({ wishlistId, itemId }) => {
            const wishlists = queryClient.getQueryData<WishlistModel[]>([WISHLISTS_QUERY]);
            const wishlistItem = wishlists?.flatMap(({ items }) => items).find(({ id }) => id === itemId);

            if (wishlists && wishlistItem) {
                const updatedWishlists = wishlists.reduce<WishlistModel[]>((acc, wishlist) => (
                    [
                        wishlistId === wishlist.id
                            ? { ...wishlist, items: [...wishlist.items, wishlistItem] }
                            : { ...wishlist, items: wishlist.items.filter(({ id }) => id !== itemId) },
                        ...acc
                    ]
                ), []);

                queryClient.setQueryData([WISHLISTS_QUERY], updatedWishlists);
            } else {
                queryClient.refetchQueries({ queryKey: [WISHLISTS_QUERY] });
            }

            return wishlists;
        },
        onError: (err, _, prevState) => {
            queryClient.setQueryData([WISHLISTS_QUERY], prevState);
        },
    });
}

export function useRemoveWishlistItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (wishlistItemId: WishlistItemModel['id']) => removeWishlistItem(wishlistItemId),
        onMutate: wishlistItemId => {
            const wishlists = queryClient.getQueryData<WishlistModel[]>([WISHLISTS_QUERY]);
            const updatedWishlists = wishlists?.map<WishlistModel>(w => ({
                ...w,
                items: w.items.filter(({ id }) => id !== wishlistItemId),
            }));

            queryClient.setQueryData([WISHLISTS_QUERY], updatedWishlists);

            return wishlists;
        },
        onError: (err, _, prevState) => {
            queryClient.setQueryData([WISHLISTS_QUERY], prevState);
        },
    });
}
