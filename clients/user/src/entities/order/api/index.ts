import clientAPI from "@shared/lib/clientApi";
import { CartModel } from "../model/Cart";

export async function getCart() {
    const { data } = await clientAPI.get<CartModel>('/order');

    return typeof data === 'string' ? { list: [] } : data;
}
