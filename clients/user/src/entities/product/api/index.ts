import { ProductOverviewModel } from "../model/interfaces";
import serverAPI from "@shared/api/api_server";

export async function getProduct(id: ProductOverviewModel['id']): Promise<ProductOverviewModel> {
    const res = await serverAPI.get<ProductOverviewModel>(`/product/${id}`);

    return res.data;
}
