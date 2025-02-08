import { OrderI } from "../order/order.interface";
import { ProductI } from "../product/product.interface";
import { PriceI } from "@shared/interfaces/price.interface";

export interface OrderItemI {
    id: string;
    amount: number;
    summaryPrice?: PriceI;
    order_id: OrderI['id'];
    product: ProductI;
    created_at: Date;
    updated_at: Date;
}
