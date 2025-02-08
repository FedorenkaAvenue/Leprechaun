import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { WishlistItemPublic } from '../wishlistItem/wishlistItem.dto';
import { WishlistItemPublicI } from '../wishlistItem/wishlistItem.interface';
import { WishlistPublicI } from './wishlist.interface';
import WishlistEntity from '@core/wishlist/wishlist.entity';
import { QueriesCommonI } from '@core/queries/queries.interface';
import { WishlistI } from '@core/wishlist/wishlist.interface';

export class WishlistPublic implements WishlistPublicI {
    @ApiProperty()
    id: string;

    @ApiProperty()
    isDefault: boolean;

    @ApiProperty()
    items_updated_at: Date;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    title: string;

    @ApiProperty({ type: WishlistItemPublic, isArray: true })
    items: WishlistItemPublicI[];

    constructor({ id, created_at, isDefault, title, items, items_updated_at }: WishlistEntity, searchParams: QueriesCommonI) {
        this.id = id;
        this.title = title;
        this.items_updated_at = items_updated_at;
        this.created_at = created_at;
        this.isDefault = isDefault;
        this.items = items.map(item => new WishlistItemPublic(item, searchParams));
    }
}

export class CreateWishlistDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true, type: 'string' })
    title: WishlistI['title'];

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: 'boolean' })
    isDefault: WishlistI['isDefault']
}

export class UpdateWishlistDTO implements Pick<WishlistPublicI, 'isDefault' | 'title'> {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    title: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false })
    isDefault: boolean;
}
