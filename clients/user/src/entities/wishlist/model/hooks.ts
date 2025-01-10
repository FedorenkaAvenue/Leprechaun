import { useSuspenseQuery } from "@tanstack/react-query";

import { getWishList } from "../api";
import { WISHLISTS_QUERY } from "../constants/queryKeys";

export function useWishlists() {
    return useSuspenseQuery({
        queryKey: [WISHLISTS_QUERY],
        queryFn: getWishList,
    });
}
