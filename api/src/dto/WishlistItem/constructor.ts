import WishlistItemEntity from '@entities/WishlistItem';
import { QueriesProductT, QueriesWishlistT } from '@interfaces/Queries';
import { WishlistItemPublicDTO } from '.';
import { ProductCard } from '../Product/constructor';

export class WishlistItemPublic extends WishlistItemPublicDTO {
    constructor({ id, product, created_at }: WishlistItemEntity, searchParams: QueriesWishlistT) {
        super();
        this.id = id;
        this.created_at = created_at;
        //TODO
        //@ts-ignore
        this.product = new ProductCard(product, searchParams as QueriesProductT);
    }
}
