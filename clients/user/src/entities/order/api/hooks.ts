import { useQuery } from "@tanstack/react-query";

import { CART_QUERY } from "../constants/queryKeys";
import { getCart } from ".";

export function useCart() {
    return useQuery({
        queryKey: [CART_QUERY],
        queryFn: getCart
    });
}
