import { OrderItemAddDTO, OderItemChangeAmountDTO } from "../api/dto";
import { CartModel } from "@entities/order/model/interfaces";
import { OrderItemModel } from "@entities/order/model/interfaces";
import clientAPI from "@shared/api/api_client";

export async function addToCart(item: OrderItemAddDTO) {
    const res = await clientAPI.post<CartModel>(`/order/item`, item);

    return res.data;
}

export async function changeOrderItemAmount(orderItemId: OrderItemModel['id'], body: OderItemChangeAmountDTO) {
    const res = await clientAPI.patch<CartModel>(`/order/item/${orderItemId}`, body);

    return res.data;
}

export async function removeOrderItem(itemId: OrderItemModel['id']) {
    const res = await clientAPI.delete(`/order/item/${itemId}`);

    return res.data;
}
