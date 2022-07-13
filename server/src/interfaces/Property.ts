import { IPropertyGroup } from './PropertyGroup';

export interface IProperty {
    id?: number
    property_group?: IPropertyGroup
    title: string
    alt_name: string
    comment?: string
}
