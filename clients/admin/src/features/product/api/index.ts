import apiClient from "@shared/api/client";
import { ProductSchemaT } from "../model/schema";
import { Product } from "@entities/product/model/interfaces";
import { rootApi } from "@shared/api";
import { PRODUCT_LIST_QUERY } from "@entities/product/constants/queryKeys";

export function createProduct(product: ProductSchemaT) {
    return apiClient.postForm<ProductSchemaT>('/product', product);
}

export function updateProduct(productId: Product['id'], updates: any) {
    return apiClient.patch(`/product/${productId}`, updates);
}

export const productFeatureApi = rootApi.injectEndpoints({
    endpoints: build => ({
        removeProduct: build.mutation<undefined, any>({
            query: (productId: Product['id']) => ({
                url: `/product/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [PRODUCT_LIST_QUERY],
        }),
    }),
});
