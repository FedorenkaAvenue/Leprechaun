import { UserPublicDTO } from '.';

export class UserPublic extends UserPublicDTO {
    constructor({ cart, wishlist, session }: UserPublicDTO) {
        super();
        this.cart = cart;
        this.wishlist = wishlist;
        this.session = session;
    }
}
