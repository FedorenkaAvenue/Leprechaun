import { useQuery } from "@tanstack/react-query";

import { PRODUCT_LIST_QUERY, PRODUCT_QUERY } from "../constants/queryKeys";
import { Product, ProductListUrlQueryParams } from "./interfaces";
import { getProduct, getProductList } from "../api";

export function useProduct(id: Product['id'] | undefined) {
    return useQuery({
        queryFn: () => getProduct(id as Product['id']),
        queryKey: [PRODUCT_QUERY, id],
        enabled: Boolean(id),
    });
}

export function useProductList(queryParams: ProductListUrlQueryParams) {
    return useQuery({
        queryFn: () => getProductList(queryParams),
        queryKey: [PRODUCT_LIST_QUERY, queryParams],
    })
}
