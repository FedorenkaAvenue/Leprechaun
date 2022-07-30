import { ApiProperty } from '@nestjs/swagger';

import { IOrderPublic } from '@interfaces/Order';
import { IUserPublic } from '@interfaces/User';
import { TWishListPublic } from '@interfaces/Wishlist';
import { ISession } from '@interfaces/Session';
import { OrderPublic } from '../Order/constructor';
import { ProductPublic } from '../Product/constructor';

export class UserPublicDTO implements IUserPublic {
    @ApiProperty({ description: 'current order', type: OrderPublic })
    cart: IOrderPublic;

    @ApiProperty({ type: ProductPublic, isArray: true })
    wishlist: TWishListPublic;

    @ApiProperty({ description: 'session id', type: 'string' })
    session: ISession['id'];
}
