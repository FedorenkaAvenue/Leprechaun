import { useQuery } from "@tanstack/react-query";

import { getProductHistory } from ".";
import { PRODUCT_HISTORY_QUERY } from "../constants/queryKeys";

export function useProductHistory() {
    return useQuery({
        queryKey: [PRODUCT_HISTORY_QUERY],
        queryFn: getProductHistory,
    })
}
