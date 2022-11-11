import { ApiProperty } from '@nestjs/swagger';

import { OrderPublicT } from '@interfaces/Order';
import { UserPublicI } from '@interfaces/User';
import { WishListTPublicT } from '@interfaces/Wishlist';
import { SessionI } from '@interfaces/Session';
import { OrderPublic } from '../Order/constructor';
import { ProductPublic } from '../Product/constructor';

export class UserPublicDTO implements UserPublicI {
    @ApiProperty({ description: 'current order', type: OrderPublic })
    cart: OrderPublicT;

    @ApiProperty({ type: ProductPublic, isArray: true })
    wishlist: WishListTPublicT;

    @ApiProperty({ description: 'session id', type: 'string' })
    session: SessionI['id'];
}
