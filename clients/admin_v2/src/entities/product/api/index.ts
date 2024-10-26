import apiClient from "@shared/api/client";
import PaginationModel from "@shared/models/Pagination";
import { ProductModel } from "../model/Product";

export async function getProductList(page: number) {
    const res = await apiClient.get<PaginationModel<ProductModel[]>>(
        '/product/list',
        {
            params: { page },
        },
    );

    return res.data;
}
