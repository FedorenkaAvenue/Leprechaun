import { useQuery } from "@tanstack/react-query";

import { getProduct, getProductList } from ".";
import { PRODUCT_LIST_QUERY, PRODUCT_QUERY } from "../constants/queryKeys";
import { ProductModel } from "../model/Product";

export function useProductList(pageNumber: number = 1) {
    return useQuery({
        queryFn: () => getProductList(pageNumber),
        queryKey: [PRODUCT_LIST_QUERY, pageNumber],
    })
}

export function useProduct(id: ProductModel['id'] | undefined) {
    return useQuery({
        queryFn: () => getProduct(id),
        queryKey: [PRODUCT_QUERY, id],
    });
}
