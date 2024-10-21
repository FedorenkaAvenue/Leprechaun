import PropertyModel from "@entities/property/model/Property";
import { CategoryPreviewModel } from "./CategoryPreview";

export interface CategoryModel extends CategoryPreviewModel {
    propertygroups: PropertyModel[]
    products: any[]
}
