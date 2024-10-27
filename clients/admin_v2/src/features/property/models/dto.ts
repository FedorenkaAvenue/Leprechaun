import PropertyGroupPreviewModel from "@entities/propertyGroup/model/PropertyGroup";
import { PropertySchemaT } from "./schema";

export interface PropertyCreateDTO extends PropertySchemaT {
    propertygroup: PropertyGroupPreviewModel['id']
}
