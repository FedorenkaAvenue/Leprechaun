import { ApiProperty } from '@nestjs/swagger';

import { OrderPublicT } from '@interfaces/Order';
import { UserPublicI } from '@interfaces/User';
import { WishListIPublicI } from '@interfaces/Wishlist';
import { SessionI } from '@interfaces/Session';
import { OrderPublic } from '../Order/constructor';
import { WishlistItemPublic } from '../WishlistItem/constructor';

export class UserPublicDTO implements UserPublicI {
    @ApiProperty({ description: 'current order', type: OrderPublic })
    cart: OrderPublicT;

    @ApiProperty({ type: WishlistItemPublic, isArray: true })
    wishlist: WishListIPublicI;

    @ApiProperty({ description: 'session id', type: 'string' })
    session: SessionI['id'];
}
