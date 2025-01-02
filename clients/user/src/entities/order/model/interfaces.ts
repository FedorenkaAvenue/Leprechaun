import { OrderStatusModel } from "./enums"
import { ProductPreviewModel } from "@entities/product/model/interfaces";
import { PriceModel } from "@shared/models/Price";

export interface OrderItemModel {
    id: string,
    product: ProductPreviewModel,
    summaryPrice: PriceModel,
    amount: number
}

export interface CartModel {
    id: string,
    status: OrderStatusModel,
    items: OrderItemModel[],
    summary: {
        price: number,
        productsAmount: number
    },
    updated_at: Date
}
