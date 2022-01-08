import { IOrder } from './Order'
import { IProduct, IProductPreview } from './Product'

export interface IOrderItemBase {
    id?: string
    amount: number
}

export interface IOrderItemPublic extends IOrderItemBase {
    product: IProductPreview
}

export interface IOrderItem<T = IProduct> extends IOrderItemBase {
    order?: IOrder | IOrder['id'];
    product: T
    created_at?: Date
}
