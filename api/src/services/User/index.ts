import { Injectable } from '@nestjs/common';

import { ISession } from '@interfaces/Session';
import { IProductPreview } from '@interfaces/Product';
import { UserPublic } from '@dto/User/constructor';
import UserAdminService from './admin';

@Injectable()
export default class UserService extends UserAdminService {
	async getUserData({ id }: ISession): Promise<UserPublic> {
		return new UserPublic({
			wishlist: await this.wishlistService.getWishlist(id),
			cart: await this.orderService.getCart(id),
            session: id
		});
	}

	getHistory(history: ISession['history']): Promise<IProductPreview[]> {
		return this.productService.getProductPreviewList(history);
	}
}
