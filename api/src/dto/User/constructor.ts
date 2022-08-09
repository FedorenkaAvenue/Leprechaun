import { IOrderPublic } from '@interfaces/Order';
import { TWishListPublic } from '@interfaces/Wishlist';
import { ISession } from '@interfaces/Session';
import { UserPublicDTO } from '.';

type TUserPublicPapams = {
    cart: IOrderPublic;
    wishlist: TWishListPublic;
    session: ISession['id'];
};

export class UserPublic extends UserPublicDTO {
    constructor({ cart, wishlist, session }: TUserPublicPapams) {
        super();
        this.cart = cart;
        this.wishlist = wishlist;
        this.session = session;
    }
}
