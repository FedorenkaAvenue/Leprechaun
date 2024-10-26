import { useQuery } from "@tanstack/react-query";

import { getProductList } from ".";
import { PRODUCT_LIST_QUERY } from "../constants/queryKeys";

export function useProductList(pageNumber: number = 1) {
    return useQuery({
        queryFn: () => getProductList(pageNumber),
        queryKey: [PRODUCT_LIST_QUERY, pageNumber],
    })
}
