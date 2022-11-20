import { Injectable } from '@nestjs/common';

import { SessionI } from '@interfaces/Session';
import { ProductPreviewI } from '@interfaces/Product';
import { UserPublic } from '@dto/User/constructor';
import UserAdminService from './admin';

@Injectable()
export default class UserService extends UserAdminService {
    async getUserData({ id }: SessionI): Promise<UserPublic> {
        return new UserPublic({
            wishlist: await this.wishlistService.getWishList(id),
            cart: await this.orderService.getCart(id),
            session: id,
        });
    }

    getHistory(history: SessionI['productHistory']): Promise<ProductPreviewI[]> {
        return this.productService.getProductPreviewList(history);
    }
}
