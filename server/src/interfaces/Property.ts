export interface IPropertyGroup {
    id?: number
    title: string
    type: FilterOptionType
    alt_name: string
    properties?: Array<IProperty> | null
    comment?: string
}

export interface IProperty {
    id?: number
    property_group?: IPropertyGroup
    title: string
    alt_name: string
    comment?: string
}

export enum FilterOptionType {
    List = 'list',
    Range = 'range',
}
