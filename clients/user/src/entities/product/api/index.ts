import { ProductOverviewModel } from "../model/interfaces";
import serverAPI from "@shared/api/serverApi";

export async function getProduct(id: ProductOverviewModel['id']): Promise<ProductOverviewModel> {
    const res = await serverAPI.get<ProductOverviewModel>(`/product/${id}`);

    return res.data;
}
