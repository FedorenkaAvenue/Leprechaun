import { ProductI, ProductCardI } from './Product';
import { SessionI } from './Session';

interface BaseI<P = ProductI> {
    id?: string;
    product: P;
    created_at?: Date;
}

export interface WishlistItemI extends BaseI {
    sid: SessionI['sid'];
}

export type WishlistItemPublicI = BaseI<ProductCardI>;
