import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createProduct, getProductList, removeProduct, updateProduct } from ".";
import { ProductSchemaT } from "../model/schema";
import { ProductModel } from "@entities/product/model/Product";
import { PRODUCT_LIST_QUERY } from "@entities/product/constants/queryKeys";
import { ProductListUrlQueryParams } from "../model/urlQueryParams";

export function useProductList(queryParams: ProductListUrlQueryParams) {
    return useQuery({
        queryFn: () => getProductList(queryParams),
        queryKey: [PRODUCT_LIST_QUERY, queryParams],
    })
}

export function useCreateProduct(successCallback?: () => void) {
    return useMutation({
        mutationFn: (product: ProductSchemaT) => createProduct(product),
        onSuccess: () => {
            successCallback?.call(null);
        }
    });
}

export function useUpdateProduct(productId: ProductModel['id']) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updates: any) => updateProduct(productId, updates),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_LIST_QUERY] });
        }
    });
}

export function useRemoveProduct(productID: ProductModel['id'] | undefined) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => removeProduct(productID),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_LIST_QUERY] });
        }
    });
}
