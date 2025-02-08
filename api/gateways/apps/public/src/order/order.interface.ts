import { OrderItemPublicI } from "../orderItem/orderItem.interface";
import { OrderI, OrderSummaryI } from "@core/order/order.interface";

export interface OrderPublicI extends Pick<OrderI<OrderItemPublicI>, 'id' | 'status' | 'items' | 'updated_at'> {
    unavailableItems: OrderItemPublicI[]
    summary: OrderSummaryI;
}
