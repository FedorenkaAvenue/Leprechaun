import { OrderPublicT } from '@interfaces/Order';
import { WishListTPublicT } from '@interfaces/Wishlist';
import { SessionI } from '@interfaces/Session';
import { UserPublicDTO } from '.';

type UserPublicPapamsT = {
    cart: OrderPublicT;
    wishlist: WishListTPublicT;
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
