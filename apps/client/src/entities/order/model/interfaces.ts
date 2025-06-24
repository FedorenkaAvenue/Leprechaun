import { ProductPreviewPublic } from '@gen/product';
import { OrderStatusModel } from './enums'
import { PriceModel } from '@shared/models/Price';

export interface OrderItemModel {
    id: string
    product: ProductPreviewPublic
    summaryPrice: PriceModel
    amount: number
}

export interface CartModel {
    id: string
    status: OrderStatusModel
    items: OrderItemModel[]
    unavailableItems: OrderItemModel[]
    summary: {
        price: number
        productsAmount: number
    },
    updated_at: Date
}
