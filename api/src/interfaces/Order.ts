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
    id?: string;
    status?: OrderStatus;
    list?: Array<T>;
    summary?: OrderSummaryI;
}

export interface OrderPublicI extends OrderBaseI<OrderItemPublicI> {}

export interface OrderI extends OrderBaseI {
    created_at?: Date;
    customer?: OrderCustomerDataI; // reciever data
    session_id?: SessionI['id'] | null; // for non-authorizated users
}
