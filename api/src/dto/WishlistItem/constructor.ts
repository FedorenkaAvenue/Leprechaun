import WishlistItemEntity from '@entities/WishlistItem';
import { QueriesWishlistI } from '@interfaces/Queries';
import { WishlistItemPublicDTO } from '.';
import { ProductCard } from '../Product/constructor';

export class WishlistItemPublic extends WishlistItemPublicDTO {
    constructor({ id, product, created_at }: WishlistItemEntity, searchParams: QueriesWishlistI) {
        super();
        this.id = id;
        this.created_at = created_at;
        this.product = new ProductCard(product, searchParams);
    }
}
