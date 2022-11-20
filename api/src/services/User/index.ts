import { Injectable } from '@nestjs/common';

import { SessionI } from '@interfaces/Session';
import { ProductPreviewI } from '@interfaces/Product';
import { UserPublic } from '@dto/User/constructor';
import UserAdminService from './admin';

@Injectable()
export default class UserService extends UserAdminService {
    async getUserData(sid: SessionI['sid']): Promise<UserPublic> {
        return new UserPublic({
            wishlist: await this.wishlistService.getWishList(sid),
            cart: await this.orderService.getCart(sid),
            session: sid,
        });
    }

    // TODO
    getHistory(history): Promise<ProductPreviewI[]> {
        return this.productService.getProductPreviewList(history);
    }
}
