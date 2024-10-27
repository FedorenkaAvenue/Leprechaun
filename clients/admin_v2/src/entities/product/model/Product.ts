import ImageModel from "@shared/models/Image"
import ProductPreviewModel from "./ProductPreview"
import PropertyGroupPreviewModel from "@entities/propertyGroup/model/PropertyGroup"

export interface ProductModel extends ProductPreviewModel {
    orderCount: number
    options: PropertyGroupPreviewModel[]
    images: ImageModel[]
}
