import { OrderItemModel } from "./OrderItem"
import { OrderStatusModel } from "./OrderStatus"

export interface CartModel {
    id: string,
    status: OrderStatusModel,
    list: OrderItemModel[],
    summary: {
        price: number,
        productsAmount: number
    },
    updated_at: Date
}
