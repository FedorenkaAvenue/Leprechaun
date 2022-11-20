import { Injectable } from '@nestjs/common';
import OrderService from '../Order';
import ProductService from '../Product';
import WishlistService from '../Wishlist';

@Injectable()
export default class UserHelperService {
    constructor(
        protected readonly productService: ProductService,
        protected readonly orderService: OrderService,
        protected readonly wishlistService: WishlistService,
    ) {}
}
