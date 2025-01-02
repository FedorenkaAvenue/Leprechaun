import { useSuspenseQuery } from "@tanstack/react-query";

import { CART_QUERY } from "../constants/queryKeys";
import { getCart } from "../api";

export function useCart() {
    return useSuspenseQuery({
        queryKey: [CART_QUERY],
        queryFn: getCart
    });
}
