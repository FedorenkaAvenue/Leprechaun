import { FavoritesI } from "@shared/models"
import { PRODUCT_PREVIEW_LIST } from "./product-preview-list"

export const WISHLIST_PRODUCTS = ((): Array<FavoritesI> => {
    return PRODUCT_PREVIEW_LIST.map(item => ({
            ...item,
            inCart: false
        }))
})()