import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProduct, productFeatureApi, updateProduct } from "../api";
import { ProductSchemaT } from "../model/schema";
import { PRODUCT_LIST_QUERY } from "@entities/product/constants/queryKeys";
import { Product } from "@entities/product/model/interfaces";

export function useCreateProduct(successCallback?: () => void) {
    return useMutation({
        mutationFn: (product: ProductSchemaT) => createProduct(product),
        onSuccess: () => {
            successCallback?.call(null);
        }
    });
}

export function useUpdateProduct(productId: Product['id']) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updates: any) => updateProduct(productId, updates),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_LIST_QUERY] });
        }
    });
}

export const useRemoveProduct = productFeatureApi.useRemoveProductMutation;
