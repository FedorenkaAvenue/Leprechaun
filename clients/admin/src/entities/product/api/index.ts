import apiClient from "@shared/api/client";
import { ProductModel } from "../model/Product";

export async function getProduct(id: ProductModel['id'] | undefined) {
    const data = await apiClient.get<ProductModel>(`/product/${id}`);
    return data.data;
}
