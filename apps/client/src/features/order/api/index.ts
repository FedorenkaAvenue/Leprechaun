'use server'

import { OrderItemPublic, OrderItemsPublicCreate_Item, OrderItemUpdatePublic_Data, OrderPublic } from '@gen/order';
import serverAPI from '@shared/api/serverApi';

export async function addToCart(items: OrderItemsPublicCreate_Item[]) {
    return (await serverAPI.post<OrderPublic>(`/order/items`, items)).data;
}

export async function changeOrderItemAmount(body: OrderItemUpdatePublic_Data) {
    return (await serverAPI.patch<OrderPublic>('/order/item', body)).data;
}

export async function removeOrderItem(itemId: OrderItemPublic['id']) {
    return (await serverAPI.delete(`/order/item/${itemId}`)).data;
}
