import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useWishlists } from '@entities/wishlist/model/hooks';
import { WishlistItemPublic, WishlistPublic } from '@gen/wishlist';
import { ProductCardPublic } from '@gen/product';

interface Result {
    isFetching: UseQueryResult['isFetching']
    selected: WishlistItemPublic | undefined
    selectedWishlist: WishlistPublic | undefined
}

export default function useAddedToWishlist(
    productId: ProductCardPublic['id'], shouldGetSelectedWishlist: boolean,
): Result {
    const { data, isFetching } = useWishlists();

    const selected = useMemo(
        () => data?.flatMap(({ items }) => items).find(({ product }) => product.id === productId),
        [data],
    );

    const selectedWishlist = useMemo(
        () => shouldGetSelectedWishlist && selected
            ? data?.find(({ items }) => items.find(({ product: { id } }) => id === productId))
            : undefined
        ,
        [shouldGetSelectedWishlist, selected],
    );

    return { isFetching, selected, selectedWishlist };
}
