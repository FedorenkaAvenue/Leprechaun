import { OrderI } from './Order';
import { PriceI } from './Price';
import { ProductI } from './Product';
import { ProductPreviewPublicI } from './Product';

interface BaseI {
    id?: string;
    amount: number;
    summaryPrice?: PriceI;
}

export interface OrderItemPublicI extends BaseI {
    product: ProductPreviewPublicI;
}

export interface OrderItemI extends BaseI {
    order_id?: OrderI['id'];
    product: ProductI;
    created_at?: Date;
    updated_at?: Date;
}
