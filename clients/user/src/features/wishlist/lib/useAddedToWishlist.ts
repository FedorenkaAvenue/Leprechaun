import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import { ProductCardModel } from '@entities/product/model/interfaces';
import { useWishlists } from '@entities/wishlist/model/hooks';
import { WishlistItemModel } from '@entities/wishlist/model/interfaces';
import { WishlistModel } from '@entities/wishlist/model/interfaces';

interface Result {
    isFetching: UseQueryResult['isFetching']
    selected: WishlistItemModel | undefined
    selectedWishlist: WishlistModel | undefined
}

export default function useAddedToWishlist(productId: ProductCardModel['id'], shouldGetSelectedWishlist: boolean): Result {
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
