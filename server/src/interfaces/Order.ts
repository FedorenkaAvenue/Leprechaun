import { IOrderItem, IOrderItemPublic } from './OrderItem';
import { IProductPreview } from './Product';
import { ISession } from './Session';

export enum OrderStatus {
    CREATED = 1,
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
    customer?: IOrderCustomerData | string
    session_id?: ISession['id'] | null // for non-authorizated users
}
