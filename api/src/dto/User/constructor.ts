import { OrderPublicT } from '@interfaces/Order';
import { WishListIPublicI } from '@interfaces/Wishlist';
import { SessionI } from '@interfaces/Session';
import { UserPublicDTO } from '.';

type UserPublicPapamsT = {
    cart: OrderPublicT;
    wishlist: WishListIPublicI;
    session: SessionI['id'];
};

export class UserPublic extends UserPublicDTO {
    constructor({ cart, wishlist, session }: UserPublicPapamsT) {
        super();
        this.cart = cart;
        this.wishlist = wishlist;
        this.session = session;
    }
}
