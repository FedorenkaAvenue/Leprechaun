import apiClient from "@shared/api/client";
import { ProductSchemaT } from "../model/schema";
import { ProductModel } from "@entities/product/model/Product";
import PaginationModel from "@shared/models/Pagination";
import ProductPreviewModel from "@entities/product/model/ProductPreview";
import { ProductListUrlQueryParams } from "../model/urlQueryParams";

export async function getProductList(params: ProductListUrlQueryParams) {
    const res = await apiClient.get<PaginationModel<ProductPreviewModel[]>>('/product/list', { params });

    return res.data;
}

export function createProduct(product: ProductSchemaT) {
    return apiClient.postForm<ProductSchemaT>('/product', product);
}

export function removeProduct(productID: ProductModel['id'] | undefined) {
    return apiClient.delete(`/product/${productID}`);
}
