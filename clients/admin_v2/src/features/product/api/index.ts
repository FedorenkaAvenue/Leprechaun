import apiClient from "@shared/api/client";
import { ProductSchemaT } from "../model/schema";
import { ProductModel } from "@entities/product/model/Product";

export function createProduct(product: ProductSchemaT) {
    return apiClient.postForm<ProductSchemaT>('/product', product);
}

export function removeProduct(productID: ProductModel['id'] | undefined) {
    return apiClient.delete(`/product/${productID}`);
}
