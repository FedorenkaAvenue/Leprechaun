import { IOrderItem, IOrderItemPublic } from './OrderItem';
import { ISession } from './Session';
import { OrderStatus } from '@enums/Order';

export interface IOrderCustomerData {
    name: string
    phone: string
}

export interface IOrderSummary {
    price: number
    productsAmount: number
}

export interface IOrderBase<T = IOrderItem> {
    id?: string
    status?: OrderStatus
    list?: Array<T>
    summary?: IOrderSummary
}

export interface IOrderPublic extends IOrderBase<IOrderItemPublic> {}

export interface IOrder extends IOrderBase {
    created_at?: Date
    customer?: IOrderCustomerData          // reciever data
    session_id?: ISession['id'] | null     // for non-authorizated users
}
