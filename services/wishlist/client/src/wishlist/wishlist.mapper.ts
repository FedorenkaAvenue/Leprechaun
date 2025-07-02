import { ProductPreview, ProductPreviewPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";
import { Wishlist, WishlistPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/wishlist";

import WishlistEntity from "./wishlist.entity";

export default class WishlistMapper {
    static toView(wishlist: WishlistEntity, products: ProductPreview[]): Wishlist {
        return {
            ...wishlist,
            items: wishlist.items.map(item => ({
                ...item,
                product: products.find(({ id }) => id === item.product) as ProductPreview,
            })),
        }
    }

    static toViewPublic(
        { id, title, isDefault, createdAt, itemsUpdatedAt, items }: WishlistEntity,
        products: ProductPreviewPublic[],
    ): WishlistPublic {
        return {
            id, title, isDefault, createdAt, itemsUpdatedAt,
            items: items.map(item => ({
                ...item,
                product: products.find(({ id }) => id === item.product) as ProductPreviewPublic,
            })),
        }
    }
}
