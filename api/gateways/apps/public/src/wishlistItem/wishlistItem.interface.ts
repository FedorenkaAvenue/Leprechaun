import { ProductPreviewPublicI } from "../product/product.interface";
import { WishlistItemI } from "@core/wishlistItem/wishlistItem.interface";

export type WishlistItemPublicI = Pick<WishlistItemI<ProductPreviewPublicI>, 'id' | 'created_at' | 'product'>
