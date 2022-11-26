import { OrderItemI, OrderItemPublicI } from './OrderItem';
import { SessionI } from './Session';
import { OrderStatus } from '@enums/Order';

export interface OrderCustomerDataI {
    name: string;
    phone: string;
}

export interface OrderSummaryI {
    price: number;
    productsAmount: number;
}

interface BaseI<T = OrderItemI> {
    id?: number;
    status?: OrderStatus;
    list?: T[];
    summary?: OrderSummaryI;
    updated_at: Date;
}

export type OrderPublicI = BaseI<OrderItemPublicI>;

export interface OrderI extends BaseI {
    created_at?: Date;
    customer?: OrderCustomerDataI; // reciever data
    sid?: SessionI['sid']; // for non-authorizated users
}
