import ImageModel from "@shared/models/Image"
import ProductPreviewModel from "./ProductPreview"
import PropertyGroupPreviewModel from "@entities/propertyGroup/model/PropertyGroup"
import TransModel from "@shared/models/Trans"

export interface ProductModel extends ProductPreviewModel {
    orderCount: number
    options: PropertyGroupPreviewModel[]
    images: ImageModel[]
    description: TransModel
}
