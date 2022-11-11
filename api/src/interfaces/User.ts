import { OrderPublicT } from './Order';
import { SessionI } from './Session';
import { WishListTPublicT } from './Wishlist';

export interface UserPublicI {
    cart: OrderPublicT;
    wishlist: WishListTPublicT;
    session: SessionI['id'];
}
