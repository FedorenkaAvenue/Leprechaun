import apiClient from "@shared/api/client";
import PaginationModel from "@shared/models/Pagination";
import { ProductModel } from "../model/Product";
import ProductPreviewModel from "../model/ProductPreview";

export async function getProductList(page: number) {
    const res = await apiClient.get<PaginationModel<ProductPreviewModel[]>>(
        '/product/list',
        {
            params: { page },
        },
    );

    return res.data;
}

export async function getProduct(id: ProductModel['id'] | undefined) {
    const data = await apiClient.get<ProductModel>(`/product/${id}`);
    return data.data;
}
