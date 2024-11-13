import { clientAPI } from "@shared/lib/api";
import { AddOrderItemDTO } from "../models/DTO";
import { CartModel } from "@entities/order/model/Cart";

export async function addToCart(item: AddOrderItemDTO) {
    const res = await clientAPI.post<CartModel>(`/order/item`, item);

    return res.data;
}
