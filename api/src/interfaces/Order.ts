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

export interface OrderBaseI<T = OrderItemI> {
    id?: string;
    status?: OrderStatus;
    list?: Array<T>;
    summary?: OrderSummaryI;
}

export type OrderPublicT = OrderBaseI<OrderItemPublicI>;

export interface OrderI extends OrderBaseI {
    created_at?: Date;
    customer?: OrderCustomerDataI; // reciever data
    session_id?: SessionI['id'] | null; // for non-authorizated users
}
