import { serverAPI } from "@shared/lib/api";
import { ProductOverviewModel } from "../models/Product";

export async function getProduct(id: ProductOverviewModel['id']) {
    const res = await serverAPI.get<ProductOverviewModel>(`/product/${id}`);

    return res.data;
}
