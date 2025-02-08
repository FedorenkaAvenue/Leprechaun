import { WishlistItemPublicI } from "../wishlistItem/wishlistItem.interface";
import { WishlistI } from "@core/wishlist/wishlist.interface"

export type WishlistPublicI = Pick<WishlistI<WishlistItemPublicI>, 'id' | 'title' | 'isDefault' | 'items'>
