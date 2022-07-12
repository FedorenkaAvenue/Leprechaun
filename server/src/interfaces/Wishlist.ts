import { IProduct } from './Product';
import { ISession } from './Session';

export interface IWishlistItem<T = IProduct> {
    id?: string
    product: T
    session_id?: ISession['id'] | null
    created_at?: Date
}
