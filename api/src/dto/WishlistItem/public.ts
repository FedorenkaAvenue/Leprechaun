import { ApiProperty } from '@nestjs/swagger';

import WishlistItemEntity from '@entities/WishlistItem';
import { QueriesWishlistI } from '@interfaces/Queries';
import { WishlistItemPublicI } from '@interfaces/WishlistItem';
import { ProductPreviewPublicI } from '@interfaces/Product';
import { ProductPreviewPublic } from '@dto/Product/public';

export class WishlistItemPublic implements WishlistItemPublicI {
    @ApiProperty()
    id: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty({ required: true })
    product: ProductPreviewPublicI;

    constructor({ id, product, created_at }: WishlistItemEntity, searchParams: QueriesWishlistI) {
        this.id = id;
        this.created_at = created_at;
        this.product = new ProductPreviewPublic(product, searchParams.lang);
    }
}
