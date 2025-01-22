import apiClient from "@shared/api/client";
import { ProductSchemaT } from "../model/schema";
import { Product } from "@entities/product/model/interfaces";

export function createProduct(product: ProductSchemaT) {
    return apiClient.postForm<ProductSchemaT>('/product', product);
}

export function updateProduct(productId: Product['id'], updates: any) {
    return apiClient.patch(`/product/${productId}`, updates);
}

export function removeProduct(productID: Product['id'] | undefined) {
    return apiClient.delete(`/product/${productID}`);
}
