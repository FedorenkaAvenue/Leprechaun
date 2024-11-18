import { OrderItemAddDTO, OderItemChangeAmountDTO } from "../models/DTO";
import { CartModel } from "@entities/order/model/Cart";
import { OrderItemModel } from "@entities/order/model/OrderItem";
import clientAPI from "@shared/lib/clientApi";

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
