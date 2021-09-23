export interface IPropertyGroup {
    id?: number
    title: string
    type: FilterOptionType
    altName: string
    filters?: Array<IProperty> | null
    comment?: string
}

export interface IProperty {
    id?: number
    filterGroup?: IPropertyGroup
    title: string
    altName: string
    comment?: string
}

export enum FilterOptionType {
    List = 'list',
    Range = 'range',
}

// interface RangeMinMax {
//     min: number;
//     max: number;
// }

// enum FilterType {
//     Price = 1,
//     Producer,
//     Universal
// }
