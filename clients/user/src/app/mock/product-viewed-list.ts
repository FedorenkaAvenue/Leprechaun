import { FavoritesI } from "@shared/models"
import { PRODUCT_PREVIEW_LIST } from "./product-preview-list"

export const VIEWED_PRODUCTS = ((): Array<any> => {
    return PRODUCT_PREVIEW_LIST.map(item => ({
            ...item
        }))
})()