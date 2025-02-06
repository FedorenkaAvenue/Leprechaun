import { SessionI } from "../session/session.interface"
import { WishlistItemI } from "../wishlistItem/wishlistItem.interface"
export interface WishlistI<I = WishlistItemI> {
    id: string
    title: string
    created_at: Date
    items_updated_at: Date
    isDefault: boolean
    items: I[]
    sid: SessionI['sid']
}
