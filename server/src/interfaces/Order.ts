import { IOrderItem, IOrderItemPublic } from './OrderItem';
import { ISession } from './Session';
import { IUser } from './User';

export enum OrderStatus {
    INIT = 1,
    POSTED,
    IN_PROCESS,
    COMPLETED,
    CANCELED
}

export interface IOrderCustomerData {
    name: string
    phone: string
}

export interface IOrderBase<T = IOrderItem> {
    id?: string
    status?: OrderStatus
    list?: Array<T>
}

export interface IOrderPublic extends IOrderBase<IOrderItemPublic> {}

export interface IOrder extends IOrderBase {
    created_at?: Date
    customer?: IOrderCustomerData          // reciever data
    user?: IUser                           // for authorized users
    session_id?: ISession['id'] | null     // for non-authorizated users
}
