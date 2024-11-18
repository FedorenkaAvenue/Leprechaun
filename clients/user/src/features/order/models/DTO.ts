import { ProductCardModel } from "@entities/product/models/Product"

export interface OrderItemAddDTO {
    product: ProductCardModel['id']
    amount: number
}

export interface OderItemChangeAmountDTO {
    amount: number
}
