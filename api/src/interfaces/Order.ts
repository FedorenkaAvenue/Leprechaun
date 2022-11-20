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

interface OrderBaseI<T = OrderItemI> {
    id?: number;
    status?: OrderStatus;
    list?: Array<T>;
    summary?: OrderSummaryI;
    updated_at: Date;
}

export type OrderPublicI = OrderBaseI<OrderItemPublicI>;

export interface OrderI extends OrderBaseI {
    created_at?: Date;
    customer?: OrderCustomerDataI; // reciever data
    session_id?: SessionI['sid'] | null; // for non-authorizated users
}
