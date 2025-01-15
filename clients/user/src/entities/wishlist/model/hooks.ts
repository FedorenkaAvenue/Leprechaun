import { useSuspenseQuery } from '@tanstack/react-query';

import { getWishLists } from '../api';
import { WISHLISTS_QUERY } from '../constants/queryKeys';

export function useWishlists() {
    return useSuspenseQuery({
        queryKey: [WISHLISTS_QUERY],
        queryFn: getWishLists,
    });
}
