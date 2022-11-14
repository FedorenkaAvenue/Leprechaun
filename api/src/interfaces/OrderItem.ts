import { ProductI, ProductPreviewI } from './Product';
import { OrderI } from './Order';
import { PriceI } from './Price';

interface OrderItemBaseI {
    id?: string;
    amount: number;
    summaryPrice?: PriceI;
}

export interface OrderItemPublicI extends OrderItemBaseI {
    product: ProductPreviewI;
}

export interface OrderItemI<T = ProductI> extends OrderItemBaseI {
    order_id?: OrderI['id'];
    product: T;
    created_at?: Date;
}
