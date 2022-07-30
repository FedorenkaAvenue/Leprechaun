import { Injectable } from '@nestjs/common';

import { ISession } from '@interfaces/Session';
import { ProductService } from './Product';
import { IProductPreview } from '@interfaces/Product';
import { OrderService } from './Order';
import { UserPublic } from '@dto/User/constructor';
import WishlistService from './Wishlist';

@Injectable()
export default class UserService {
	constructor(
		private readonly productService: ProductService,
		private readonly orderService: OrderService,
		private readonly wishlistService: WishlistService
	) { }

	// CONTROLLERS
	
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
