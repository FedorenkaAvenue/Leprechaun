export interface IFilterGroup {
    id: number
    title: string
    type: FilterOptionType
    altName: string
    isPublic: boolean
    comment?: string
    filters?: Array<IFilter>
}

export interface IFilter {
    id: number
    groupId: number
    title: string
    altName: string
    isPublic: boolean
    comment?: string
}

enum FilterOptionType {
    List = 1,
    Range,
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
