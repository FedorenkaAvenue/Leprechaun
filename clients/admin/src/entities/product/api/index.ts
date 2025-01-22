import apiClient from "@shared/api/client";
import { Product, ProductListUrlQueryParams, ProductPreview } from "../model/interfaces";
import { Pagination } from "@shared/models/interfaces";

export async function getProduct(id: Product['id']): Promise<Product> {
    return (await apiClient.get<Product>(`/product/${id}`)).data;
}

export async function getProductList(params: ProductListUrlQueryParams): Promise<Pagination<ProductPreview[]>> {
    return (await apiClient.get<Pagination<ProductPreview[]>>('/product/list', { params })).data;
}
