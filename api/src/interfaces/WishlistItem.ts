import { ProductI, ProductPublicI } from './Product';
import { SessionI } from './Session';

interface WishlistItemBaseI<P = ProductI> {
    id?: string;
    product: P;
    created_at?: Date;
}

export interface WishlistItemI extends WishlistItemBaseI {
    session_id: SessionI['id'] | null;
}

export type WishlistItemPublicI = WishlistItemBaseI<ProductPublicI>;
