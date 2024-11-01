import PropertyGroupPreviewModel from "./PropertyGroup";
import { CategoryPreviewModel } from "@entities/category/model/CategoryPreview";

export default interface PropertyGroupModel extends PropertyGroupPreviewModel {
    categories: CategoryPreviewModel[]
}
