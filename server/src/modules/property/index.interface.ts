export interface IPropertyGroup {
    id?: number
    title: string
    type: FilterOptionType
    altName: string
    properties?: Array<IProperty> | null
    comment?: string
}

export interface IProperty {
    id?: number
    propertyGroup?: IPropertyGroup
    title: string
    altName: string
    comment?: string
}

export enum FilterOptionType {
    List = 'list',
    Range = 'range',
}
