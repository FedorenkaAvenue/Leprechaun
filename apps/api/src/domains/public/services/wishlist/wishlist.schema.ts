import { ApiProperty } from '@nestjs/swagger';

import { WishlistItemPublic, WishlistPublic } from '@gen/wishlist';
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

// export class CreateWishlistDTO {
//     @IsNotEmpty()
//     @IsString()
//     @ApiProperty({ required: true, type: 'string' })
//     title: WishlistI['title'];

//     @IsOptional()
//     @IsBoolean()
//     @ApiProperty({ required: false, type: 'boolean' })
//     isDefault: WishlistI['isDefault']
// }

// export class UpdateWishlistDTO implements Pick<WishlistPublicI, 'isDefault' | 'title'> {
//     @IsOptional()
//     @IsString()
//     @ApiProperty({ required: false })
//     title: string;

//     @IsOptional()
//     @IsBoolean()
//     @ApiProperty({ required: false })
//     isDefault: boolean;
// }

// export class WishlistItemMoveDTO {
//     @IsUUID()
//     @IsNotEmpty()
//     @ApiProperty({ required: true, type: 'string' })
//     itemId: WishlistItemPublicI['id'];

//     @IsUUID()
//     @IsNotEmpty()
//     @ApiProperty({ required: true, type: 'string' })
//     wishlistId: WishlistI['id'];
// }
