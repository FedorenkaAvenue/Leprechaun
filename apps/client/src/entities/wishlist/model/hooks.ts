import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getWishLists } from '../api';
import { WISHLISTS_QUERY } from '../constants/queryKeys';
import { WishlistPublic } from '@gen/wishlist';

export function useWishlists() {
    return useSuspenseQuery({
        queryKey: [WISHLISTS_QUERY],
        queryFn: getWishLists,
    });
}

export function useWishlist(wishlistId: WishlistPublic['id']): WishlistPublic {
    const { data } = useWishlists();
    const currentWishlist = useMemo(() => data?.find(({ id }) => id === wishlistId) as WishlistPublic, [data]);

    return currentWishlist;
}
