import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getWishLists } from '../api';
import { WISHLISTS_QUERY } from '../constants/queryKeys';
import { WishlistModel } from './interfaces';

export function useWishlists() {
    return useSuspenseQuery({
        queryKey: [WISHLISTS_QUERY],
        queryFn: getWishLists,
    });
}

export function useWishlist(wishlistId: WishlistModel['id']): WishlistModel {
    const { data } = useWishlists();
    const currentWishlist = useMemo(() => data?.find(({ id }) => id === wishlistId) as WishlistModel, [data]);

    return currentWishlist;
}
