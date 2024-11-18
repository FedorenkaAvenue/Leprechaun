import { ProductOverviewModel } from "../models/Product";
import serverAPI from "@shared/lib/serverApi";

export async function getProduct(id: ProductOverviewModel['id']) {
    const res = await serverAPI.get<ProductOverviewModel>(`/product/${id}`);

    return res.data;
}
