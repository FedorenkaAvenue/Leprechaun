import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroup";
import TransModel from "@shared/models/Trans";

export interface PropertyCreateDTO {
    propertygroup: PropertyGroupModel['id']
    title: TransModel
    alt_name: string
    comment?: string
}
