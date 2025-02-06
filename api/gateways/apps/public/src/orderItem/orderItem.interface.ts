import { ProductPreviewPublicI } from "../product/product.interface";
import { OrderItemI } from "@core/orderItem/orderItem.interface";

export interface OrderItemPublicI extends Pick<OrderItemI, 'id' | 'amount' | 'summaryPrice'> {
    product: ProductPreviewPublicI;
}
