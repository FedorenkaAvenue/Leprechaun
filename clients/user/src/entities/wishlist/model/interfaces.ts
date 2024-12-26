import { ProductPreviewModel } from "@entities/product/model/interfaces";

export interface WishlistItemModel {
    id: string
    created_at: string
    product: ProductPreviewModel
}

export interface WishlistModel {
    id: string
    isDefault: boolean
    title: string
    created_at: Date
    items_updated_at: Date
    items: WishlistItemModel[]
}
