import { OrderItemI, OrderItemPublicI } from './OrderItem';
import { SessionI } from './Session';
import { OrderStatus } from '@enums/Order';

interface BaseI<T> {
    id?: number;
    status?: OrderStatus;
    items?: T[];
    summary?: OrderSummaryI;
    updated_at: Date;
}

export interface OrderCustomerDataI {
    name: string;
    phone: string;
}

export interface OrderSummaryI {
    price: number;
    productsAmount: number;
}

export interface OrderPublicI extends BaseI<OrderItemPublicI> {
    unavailableItems: OrderItemPublicI[]
}

export interface OrderI extends BaseI<OrderItemI> {
    created_at?: Date;
    customer?: OrderCustomerDataI; // reciever data
    sid?: SessionI['sid']; // for non-authorizated users
}
