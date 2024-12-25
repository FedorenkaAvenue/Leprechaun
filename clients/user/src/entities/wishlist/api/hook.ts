import { useQuery } from "@tanstack/react-query";

import { getWishList } from ".";
import { WISHLISTS_QUERY } from "../constants/queryKeys";

export function useWishList() {
    return useQuery({
        queryFn: getWishList,
        queryKey: [WISHLISTS_QUERY],
        staleTime: 1000 * 360,
    });
}
