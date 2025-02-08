import { ProductI } from "../product/product.interface";
import { WishlistI } from "../wishlist/wishlist.interface";

export interface WishlistItemI<P = ProductI> {
    id?: string;
    product: P;
    created_at?: Date;
    wishlist: WishlistI
}
