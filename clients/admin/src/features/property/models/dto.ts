import { PropertyGroupPreview } from "@entities/propertyGroup/model/interfaces";
import { PropertySchema } from "./schema";

export interface PropertyCreateDTO extends PropertySchema {
    propertygroup: PropertyGroupPreview['id']
}
