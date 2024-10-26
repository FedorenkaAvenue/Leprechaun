import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, removeProduct } from ".";
import { ProductSchemaT } from "../model/schema";
import { ProductModel } from "@entities/product/model/Product";
import { PRODUCT_LIST_QUERY } from "@entities/product/constants/queryKeys";

export function useCreateProduct() {
    return useMutation({
        mutationFn: (product: ProductSchemaT) => createProduct(product),
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
