export type TPropertyID = number
export type TPropertyGroupId = number

export interface IPropertyGroup {
    id?: TPropertyGroupId
    title: string
    type: FilterOptionType
    alt_name: string
    properties?: Array<IProperty> | null
    comment?: string
}

export interface IProperty {
    id?: TPropertyID
    property_group?: IPropertyGroup
    title: string
    alt_name: string
    comment?: string
}

export enum FilterOptionType {
    List = 'list',
    Range = 'range',
}
