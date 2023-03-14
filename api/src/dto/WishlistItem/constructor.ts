import { ApiProperty } from '@nestjs/swagger';

import WishlistItemEntity from '@entities/WishlistItem';
import { QueriesWishlistI } from '@interfaces/Queries';
import { ProductLightCard } from '../Product/constructor';
import { WishlistItemPublicI } from '@interfaces/WishlistItem';

export class WishlistItemPublic implements WishlistItemPublicI {
    @ApiProperty()
    id: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty({ required: true })
    product: ProductLightCard;

    constructor({ id, product, created_at }: WishlistItemEntity, searchParams: QueriesWishlistI) {
        this.id = id;
        this.created_at = created_at;
        this.product = new ProductLightCard(product, searchParams);
    }
}
