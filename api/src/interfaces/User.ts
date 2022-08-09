import { IOrderPublic } from './Order';
import { ISession } from './Session';
import { TWishListPublic } from './Wishlist';

export interface IUserPublic {
    cart: IOrderPublic;
    wishlist: TWishListPublic;
    session: ISession['id'];
}
