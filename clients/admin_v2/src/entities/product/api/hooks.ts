import { useQuery } from "@tanstack/react-query";

import { getProduct, getProductList } from ".";
import { PRODUCT_LIST_QUERY, PRODUCT_QUERY } from "../constants/queryKeys";
import { ProductModel } from "../model/Product";
import ProductUrlQueryParams from "../model/ProductUrlQueryParams";

export function useProductList(queryParams: ProductUrlQueryParams) {
    return useQuery({
        queryFn: () => getProductList(queryParams),
        queryKey: [PRODUCT_LIST_QUERY, queryParams],
    })
}

export function useProduct(id: ProductModel['id'] | undefined) {
    return useQuery({
        queryFn: () => getProduct(id),
        queryKey: [PRODUCT_QUERY, id],
    });
}
