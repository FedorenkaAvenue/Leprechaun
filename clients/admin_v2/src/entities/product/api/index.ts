import apiClient from "@shared/api/client";
import PaginationModel from "@shared/models/Pagination";
import { ProductModel } from "../model/Product";
import ProductPreviewModel from "../model/ProductPreview";
import ProductUrlQueryParams from "../model/ProductUrlQueryParams";

export async function getProductList(params: ProductUrlQueryParams) {
    const res = await apiClient.get<PaginationModel<ProductPreviewModel[]>>('/product/list', { params });

    return res.data;
}

export async function getProduct(id: ProductModel['id'] | undefined) {
    const data = await apiClient.get<ProductModel>(`/product/${id}`);
    return data.data;
}
