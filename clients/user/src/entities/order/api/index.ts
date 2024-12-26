import clientAPI from "@shared/api/api_client";
import { CartModel } from "../model/interfaces";

export async function getCart(): Promise<CartModel | null> {
    const { data } = await clientAPI.get<CartModel>('/order');

    return typeof data === 'string' ? null : data;
}
