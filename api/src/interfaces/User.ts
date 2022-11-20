import { OrderPublicI } from './Order';
import { SessionI } from './Session';
import { WishListIPublicI } from './Wishlist';

export interface UserPublicI {
    cart: OrderPublicI;
    wishlist: WishListIPublicI;
    session: SessionI['sid'];
}
