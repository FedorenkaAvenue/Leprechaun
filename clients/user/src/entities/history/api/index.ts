import { ProductPreviewModel } from "@entities/product/model/interfaces";
import clientAPI from "@shared/api/api_client";

export async function getProductHistory(): Promise<ProductPreviewModel[]> {
    const res = await clientAPI.get<ProductPreviewModel[]>('/history/product');

    return res.data;
}
