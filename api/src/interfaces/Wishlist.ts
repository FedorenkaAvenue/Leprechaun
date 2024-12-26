import { SessionI } from "./Session"
import { WishlistItemI, WishlistItemPublicI } from "./WishlistItem"

interface BaseI<I> {
    id: string
    title: string
    created_at: Date
    items_updated_at: Date
    isDefault: boolean
    items: I[]
}

export interface WishlistPublicI extends BaseI<WishlistItemPublicI> { }

export interface WishlistI extends BaseI<WishlistItemI> {
    sid: SessionI['sid']
}
