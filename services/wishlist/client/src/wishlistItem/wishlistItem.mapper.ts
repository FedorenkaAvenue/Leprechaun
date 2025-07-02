import { ProductPreviewPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";
import { WishlistItemPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/wishlist";

import WishlistItemEntity from "./wishlistItem.entity";

export default class WishlistItemMapper {
    static toViewPublic(
        { id, createdAt }: WishlistItemEntity,
        product: ProductPreviewPublic,
    ): WishlistItemPublic {
        return { id, createdAt, product };
    }
}
