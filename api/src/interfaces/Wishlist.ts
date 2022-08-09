import { IProduct, IPublicProduct } from './Product';
import { ISession } from './Session';

export interface IWishlistItem {
    id?: string;
    product: IProduct;
    session_id?: ISession['id'] | null;
    created_at?: Date;
}

export type TWishList = Array<IWishlistItem>;
export type TWishListPublic = Array<IPublicProduct>;
