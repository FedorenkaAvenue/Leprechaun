import { ProductCardModel } from "@entities/product/models/Product"

export interface WishListItemModel {
    id: string
    created_at: string
    product: ProductCardModel
}
