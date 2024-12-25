import { ProductI, ProductPreviewPublicI } from '@interfaces/Product';
import { WishlistI } from './Wishlist';

interface BaseI<P> {
    id?: string;
    product: P;
    created_at?: Date;
}

export interface WishlistItemI extends BaseI<ProductI> {
    wishlist: WishlistI
}

export interface WishlistItemPublicI extends BaseI<ProductPreviewPublicI> { }
