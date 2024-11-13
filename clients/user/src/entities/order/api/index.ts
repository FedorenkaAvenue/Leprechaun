import { clientAPI } from "@shared/lib/api";
import { CartModel } from "../model/Cart";

export async function getCart() {
    const res = await clientAPI.get<CartModel>('/order');

    return res.data;
}
