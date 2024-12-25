import { WishlistI, WishlistPublicI } from "./Wishlist";

interface Base<W> {
    default: W
    others: W[]
}

export interface FavoritesI extends Base<WishlistI> { }

export interface FavoritesPublicI extends Base<WishlistPublicI> { }
