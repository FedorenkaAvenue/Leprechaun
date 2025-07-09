import { ApiProperty } from '@nestjs/swagger';
import {
    Wishlist, WishlistCreate, WishlistItemMoveParams, WishlistItemPublic, WishlistPublic,
} from '@fedorenkaavenue/leprechaun_lib_entities/server/wishlist';

import { ProductPreviewPublicSchema } from '../product/product.schema';

export class WishlistItemPublicSchema implements WishlistItemPublic {
    @ApiProperty()
    id: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty({ type: ProductPreviewPublicSchema })
    product: ProductPreviewPublicSchema;
}

export class WishlistPublicSchema implements WishlistPublic {
    @ApiProperty()
    id: string;

    @ApiProperty()
    isDefault: boolean;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    title: string;

    @ApiProperty({ type: WishlistItemPublicSchema, isArray: true })
    items: WishlistItemPublicSchema[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    itemsUpdatedAt: Date;
}

export class WishlistCreateSchema implements Omit<WishlistCreate, 'user'> {
    @ApiProperty({ required: true, type: 'string' })
    title: WishlistPublic['title'];

    @ApiProperty({ required: false, type: 'boolean' })
    isDefault: WishlistPublic['isDefault']
}

export class WishlistUpdateSchema implements Partial<WishlistCreate> {
    @ApiProperty({ required: false })
    title: string;

    @ApiProperty({ required: false })
    isDefault: boolean;
}

export class WishlistItemMoveSchema implements Omit<WishlistItemMoveParams, 'user'> {
    @ApiProperty({ required: true, type: 'string' })
    itemId: WishlistItemPublic['id'];

    @ApiProperty({ required: true, type: 'string' })
    wishlistId: Wishlist['id'];
}
