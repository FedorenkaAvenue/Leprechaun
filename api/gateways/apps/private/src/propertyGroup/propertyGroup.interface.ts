import { PropertyGroupI } from "@core/propertyGroup/propertyGroup.interface";

export type PropertyGroupPreviewI = Pick<PropertyGroupI, 'id' | 'alt_name' | 'comment' | 'created_at' | 'title' | 'is_primary' | 'updated_at'>
