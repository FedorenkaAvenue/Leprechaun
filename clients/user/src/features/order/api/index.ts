'use server'

import { OrderItemAddDTO, OderItemChangeAmountDTO } from "../api/dto";
import { CartModel } from "@entities/order/model/interfaces";
import { OrderItemModel } from "@entities/order/model/interfaces";
import serverAPI from "@shared/api/serverApi";

export async function addToCart(items: OrderItemAddDTO[]) {
    return (await serverAPI.post<CartModel>(`/order/items`, items)).data;
}

export async function changeOrderItemAmount(orderItemId: OrderItemModel['id'], body: OderItemChangeAmountDTO) {
    return (await serverAPI.patch<CartModel>(`/order/item/${orderItemId}`, body)).data;
}

export async function removeOrderItem(itemId: OrderItemModel['id']) {
    return (await serverAPI.delete(`/order/item/${itemId}`)).data;
}
