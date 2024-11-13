import { ProductCardModel } from "@entities/product/models/Product"

export interface AddOrderItemDTO {
    product: ProductCardModel['id']
    amount: number
}
