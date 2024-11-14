import { ProductCardModel, ProductPreviewModel } from "@entities/product/models/Product"

export interface WishListItemModel {
    id: string
    created_at: string
    product: ProductPreviewModel
}
