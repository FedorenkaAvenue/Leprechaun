import { WishlistItemModel } from "./WishlistItem"

export interface WishlistModel {
    id: string
    isDefault: boolean
    title: string
    created_at: string
    items: WishlistItemModel[]
}
