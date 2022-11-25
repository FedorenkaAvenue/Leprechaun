import { ProductI, ProductPreviewI } from './Product';
import { OrderI } from './Order';
import { PriceI } from './Price';

interface BaseI {
    id?: string;
    amount: number;
    summaryPrice?: PriceI;
}

export interface OrderItemPublicI extends BaseI {
    product: ProductPreviewI;
}

export interface OrderItemI<T = ProductI> extends BaseI {
    order_id?: OrderI['id'];
    product: T;
    created_at?: Date;
}
