import { ProductPreviewModel } from "@entities/product/models/Product"

export interface WishlistItemModel {
    id: string
    created_at: string
    product: ProductPreviewModel
}
