import { WishlistItemPublic } from "gen/wishlist";
import WishlistItemEntity from "./wishlistItem.entity";
import { ProductPreviewPublic } from "gen/product";

export default class WishlistItemMapper {
    static toViewPublic(
        { id, createdAt }: WishlistItemEntity,
        product: ProductPreviewPublic,
    ): WishlistItemPublic {
        return { id, createdAt, product };
    }
}
