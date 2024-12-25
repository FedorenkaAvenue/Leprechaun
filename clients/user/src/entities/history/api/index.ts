import { ProductPreviewModel } from "@entities/product/models/Product";
import clientAPI from "@shared/lib/api_client";

export async function getProductHistory() {
    const res = await clientAPI.get<ProductPreviewModel[]>('/history/product');

    return res.data;
}
