import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroup"
import TransModel from "@shared/models/Trans"

export interface CategoryCreateDTO {
    url: string,
    title: TransModel
    is_public: boolean,
    icon: File,
    propertygroups: PropertyGroupModel['id'][],
    comment: string
}
