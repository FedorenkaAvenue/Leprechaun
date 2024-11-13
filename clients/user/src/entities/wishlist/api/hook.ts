import { useQuery } from "@tanstack/react-query";

import { getWishList } from ".";
import { WISHLIST_QUERY } from "../constants/queryKeys";

export function useWishList() {
    return useQuery({
        queryFn: getWishList,
        queryKey: [WISHLIST_QUERY],
        staleTime: 1000 * 360,
    });
}
