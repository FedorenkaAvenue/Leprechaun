import { ProductI, PublicProductI } from './Product';
import { SessionI } from './Session';

export interface WishlistItemI {
    id?: string;
    product: ProductI;
    session_id?: SessionI['id'] | null;
    created_at?: Date;
}

export type WishListT = Array<WishlistItemI>;
export type WishListTPublicT = Array<PublicProductI>;
