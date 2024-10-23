import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroup";
import { PropertySchemaT } from "./schema";

export interface PropertyCreateDTO extends PropertySchemaT {
    propertygroup: PropertyGroupModel['id']
}
