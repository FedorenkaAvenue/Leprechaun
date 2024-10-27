import { CategoryPreviewModel } from "./CategoryPreview";
import PropertyGroupPreviewModel from "@entities/propertyGroup/model/PropertyGroup";

export interface CategoryModel extends CategoryPreviewModel {
    propertygroups: PropertyGroupPreviewModel[]
    products: any[]
}
