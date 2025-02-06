import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { WishlistItemPublicI } from './wishlistItem.interface';
import { ProductPreviewPublicI } from '../product/product.interface';
import { ProductPreviewPublic } from '../product/product.dto';
import WishlistItemEntity from '@core/wishlistItem/wishlistItem.entity';
import { QueriesCommonI } from '@core/queries/queries.interface';
import { WishlistI } from '@core/wishlist/wishlist.interface';

export class WishlistItemPublic implements WishlistItemPublicI {
    @ApiProperty()
    id: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty({ type: ProductPreviewPublic, required: true })
    product: ProductPreviewPublicI;

    constructor({ id, product, created_at }: WishlistItemEntity, searchParams: QueriesCommonI) {
        this.id = id;
        this.created_at = created_at;
        this.product = new ProductPreviewPublic(product, searchParams.lang);
    }
}

export class WishlistItemMoveDTO {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ required: true, type: 'string' })
    itemId: WishlistItemPublicI['id'];

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ required: true, type: 'string' })
    wishlistId: WishlistI['id'];
}
