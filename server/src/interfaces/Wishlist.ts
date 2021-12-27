import { IProduct } from './Product';
import { ISession } from './Session';

export interface IWishlistItem<T = IProduct> {
    id?: string
    created_at?: Date
    product: T
    session_id?: ISession['id'] | null
}
