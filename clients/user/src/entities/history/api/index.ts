'use server'

import { ProductPreviewModel } from "@entities/product/model/interfaces";
import serverAPI from "@shared/api/serverApi";

export async function getProductHistory(): Promise<ProductPreviewModel[]> {
    const res = await serverAPI.get<ProductPreviewModel[]>('/history/product');

    return res.data;
}
