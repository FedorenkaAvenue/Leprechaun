import { Module } from '@nestjs/common';

import UserService from '@services/User';
import UserController from '@controllers/User';
import ProductModule from './Product';
import OrderModule from './Order';
import WishlistModule from './Wishlist';

@Module({
    controllers: [ UserController ],
    providers: [ UserService ],
    imports: [ ProductModule, OrderModule, WishlistModule ]
})
export default class UserModule {}
