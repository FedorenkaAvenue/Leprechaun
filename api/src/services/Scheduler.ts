import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import OrderService from './Order';
import WishlistService from './Wishlist';

@Injectable()
export default class SchedulerService {
    constructor(private readonly orderService: OrderService, private readonly wishlistService: WishlistService) {}

    @Cron('0 0 3 * * 1')
    clearUselessSessionData() {
        // this.orderService.clearUselessOrders();
        // this.wishlistService.clearUselessWishlist();
    }
}
