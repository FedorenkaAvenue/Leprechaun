import { IProduct } from './Product';

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

export interface IOrderItem {
    id?: string
    order_id?: string
    product_id: IProduct['id']
    amount: number
}

export interface IOrder {
    id?: string
    created_at?: Date
    order_items: Array<IOrderItem>
    status?: OrderStatus
    customer: IOrderCustomerData | string
}
