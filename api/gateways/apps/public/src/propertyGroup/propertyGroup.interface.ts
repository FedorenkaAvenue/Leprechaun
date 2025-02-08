import { PropertyGroupI } from "@core/propertyGroup/propertyGroup.interface";

export type PropertyGroupPublicI = Pick<PropertyGroupI<string>, 'id' | 'title' | 'alt_name'>
