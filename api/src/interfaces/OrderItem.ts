import { IProduct, IProductPreview } from './Product';
import { IOrder } from './Order';
import { IPrice } from './Price';

export interface IOrderItemBase {
    id?: string;
    amount: number;
    summaryPrice?: IPrice;
}

export interface IOrderItemPublic extends IOrderItemBase {
    product: IProductPreview;
}

export interface IOrderItem<T = IProduct> extends IOrderItemBase {
    order_id?: IOrder['id'];
    product: T;
    created_at?: Date;
}
