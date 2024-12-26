import { LabelModel } from "@shared/models/Label"
import { ProductLabelModel } from "./enums"
import { ImageModel } from "@shared/models/Image"
import { ProductStatusModel } from "./enums"
import { PriceModel } from "@shared/models/Price"

type ProductId = string;

interface OptionModel {
    id: number
    title: string,
    alt_name: string
    properties: OptionProperty[]
}

interface OptionProperty {
    id: number
    title: string
    alt_name: string
}

export interface ProductCardModel {
    id: ProductId
    title: string
    description: string
    status: ProductStatusModel
    price: PriceModel
    labels: LabelModel<ProductLabelModel>[]
    images: ImageModel[]
    options: OptionModel[]
}

export interface ProductPreviewModel {
    id: ProductId
    title: string
    image: string
    labels: LabelModel<ProductLabelModel>[]
    price: PriceModel
    status: ProductStatusModel
}

export interface ProductOverviewModel extends ProductCardModel {

}
