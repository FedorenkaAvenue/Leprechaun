import { ApiProperty } from '@nestjs/swagger';

import { WishlistItemPublicI } from '@interfaces/WishlistItem';
import { ProductPublic } from '../Product/constructor';

export class WishlistItemPublicDTO implements WishlistItemPublicI {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty({ required: true })
    product: ProductPublic;
}
