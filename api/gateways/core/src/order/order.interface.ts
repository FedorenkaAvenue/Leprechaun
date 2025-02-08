import { OrderItemI } from "../orderItem/orderItem.interface";
import { OrderStatus } from "./order.enum";
import { SessionI } from "../session/session.interface";

export interface OrderCustomerDataI {
    name: string;
    phone: string;
}

export interface OrderSummaryI {
    price: number;
    productsAmount: number;
}

export interface OrderI<T = OrderItemI> {
    id: number;
    status: OrderStatus;
    items: T[];
    updated_at: Date;
    created_at: Date;
    customer: OrderCustomerDataI; // reciever data
    sid: SessionI['sid']; // for non-authorizated users
}
