import { ProductCardModel } from '@entities/product/model/interfaces'

export interface OrderItemAddDTO {
    product: ProductCardModel['id']
    amount: number
}

export interface OderItemChangeAmountDTO {
    amount: number
}
