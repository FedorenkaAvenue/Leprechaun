import { ProductI, ProductLightCardI } from '@interfaces/Product';
import { SessionI } from './Session';

interface BaseI<P> {
    id?: string;
    product: P;
    created_at?: Date;
}

export interface WishlistItemI extends BaseI<ProductI> {
    sid: SessionI['sid'];
}

export type WishlistItemPublicI = BaseI<ProductLightCardI>;
