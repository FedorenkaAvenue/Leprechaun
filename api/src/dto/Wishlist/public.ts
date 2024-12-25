import { ApiProperty } from '@nestjs/swagger';

import { QueriesWishlistI } from '@interfaces/Queries';
import { WishlistPublicI } from '@interfaces/Wishlist';
import WishlistEntity from '@entities/Wishlist';
import { WishlistItemPublicI } from '@interfaces/WishlistItem';
import { WishlistItemPublic } from '@dto/WishlistItem/public';

export class WishlistPublic implements WishlistPublicI {
    @ApiProperty()
    id: string;

    @ApiProperty()
    isDefault: boolean;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    title: string;

    @ApiProperty({ type: WishlistItemPublic, isArray: true })
    items: WishlistItemPublicI[];

    constructor({ id, created_at, isDefault, title, items }: WishlistEntity, searchParams: QueriesWishlistI) {
        this.id = id;
        this.title = title;
        this.created_at = created_at;
        this.isDefault = isDefault;
        this.items = items.map(i => new WishlistItemPublic(i, searchParams));
    }
}
