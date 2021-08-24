export interface IFilterGroup {
    id?: number
    title: string
    type: FilterOptionType
    altName: string
    isPublic: boolean
    filters?: Array<IFilter> | null
    _comment?: string
}

export interface IFilter {
    id?: number
    filterGroup?: IFilterGroup
    title: string
    altName: string
    isPublic: boolean
    _comment?: string
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
