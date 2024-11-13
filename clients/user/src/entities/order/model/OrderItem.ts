import { ProductPreviewModel } from "@entities/product/models/Product";
import { PriceModel } from "@shared/models/Price";

export interface OrderItemModel {
    id: string,
    product: ProductPreviewModel,
    summaryPrice: PriceModel,
    amount: number
}
