import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

import WishlistItemEntity from '@entities/WishlistItem';
import { WishlistItemI, WishlistItemPublicI } from '@interfaces/WishlistItem';
import { ProductPreviewPublicI } from '@interfaces/Product';
import { ProductPreviewPublic } from '@dto/Product/public';
import { WishlistI } from '@interfaces/Wishlist';
import { QueriesCommon } from '@dto/Queries';

export class WishlistItemPublic implements WishlistItemPublicI {
    @ApiProperty()
    id: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty({ type: ProductPreviewPublic, required: true })
    product: ProductPreviewPublicI;

    constructor({ id, product, created_at }: WishlistItemEntity, searchParams: QueriesCommon) {
        this.id = id;
        this.created_at = created_at;
        this.product = new ProductPreviewPublic(product, searchParams.lang);
    }
}

export class WishlistItemMoveDTO {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ required: true, type: 'string' })
    itemId: WishlistItemI['id'];

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ required: true, type: 'string' })
    wishlistId: WishlistI['id'];
}
