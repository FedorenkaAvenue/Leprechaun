import PriceModel from "@shared/models/Price"
import { ProductStatusT } from "./ProductStatus"
import TransModel from "@shared/models/Trans"

export default interface ProductPreviewModel {
    comment: string
    created_at: string
    image: string
    id: string
    is_new: boolean
    is_public: boolean
    price: PriceModel
    rating: number
    status: ProductStatusT
    title: TransModel
}
