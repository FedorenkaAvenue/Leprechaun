export interface IPropertyGroup {
    id?: number
    title: string
    type: PropertyGroupOptionType
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

export enum PropertyGroupOptionType {
    List = 'list',
    Range = 'range',
}
