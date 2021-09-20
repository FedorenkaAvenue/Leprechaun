export interface IFilterGroup {
    id?: number
    title: string
    type: FilterOptionType
    altName: string
    filters?: Array<IFilter> | null
    comment?: string
}

export interface IFilter {
    id?: number
    filterGroup?: IFilterGroup
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
