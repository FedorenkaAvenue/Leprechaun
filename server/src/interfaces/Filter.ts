import { IProperty } from './Property';
import { IPropertyGroup } from './PropertyGroup';

export interface IFilters {
    price: IFilterRangeGroup
    dinamicFilters: Array<IFilterGroup | IFilterRangeGroup>
}

export interface IFilterGroup extends IPropertyGroup {
    type: FilterType
}

export interface IFilterListGroup extends IFilterGroup {
    list: Array<IListFilter>
}

export interface IFilterRangeGroup extends IFilterGroup {
    range: IRangeFilter
}

export interface IRangeFilter {
    min: number;
    max: number;
}

export interface IListFilter extends IProperty {
    selected: boolean
    // amount: number
    // available: number
}

export enum FilterType {
    List = 'list',
    Range = 'range',
}
