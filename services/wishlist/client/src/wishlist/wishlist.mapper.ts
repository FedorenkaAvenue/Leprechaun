import { Wishlist, WishlistPublic } from "gen/wishlist";
import WishlistEntity from "./wishlist.entity";
import { ProductPreview, ProductPreviewPublic } from "gen/product";

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

    static toPublicView({ user, ...wishlist }: WishlistEntity, products: ProductPreviewPublic[]): WishlistPublic {
        return {
            ...wishlist,
            items: wishlist.items.map(item => ({
                ...item,
                product: products.find(({ id }) => id === item.product) as ProductPreviewPublic,
            })),
        }
    }
}
