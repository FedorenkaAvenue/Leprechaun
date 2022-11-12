import { OrderPublicT } from './Order';
import { SessionI } from './Session';
import { WishListIPublicI } from './Wishlist';

export interface UserPublicI {
    cart: OrderPublicT;
    wishlist: WishListIPublicI;
    session: SessionI['id'];
}
