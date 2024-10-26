import PriceModel from "@shared/models/Price"
import { ProductStatusT } from "./ProductStatus"
import TransModel from "@shared/models/Trans"
import ImageModel from "@shared/models/Image"

export interface ProductModel {
    comment?: string
    created_at: string
    id: string
    images: ImageModel[]
    is_new: boolean
    is_public: boolean
    // options: []
    orderCount: number
    price: PriceModel
    rating: number
    status: ProductStatusT
    title: TransModel
}
