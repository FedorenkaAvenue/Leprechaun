import { IProperty } from './Property';
import { IPropertyGroup } from './PropertyGroup';

export interface IFilters {
    price: any
    dinamicFilters: Array<IFilterGroup>
}

export interface IFilterGroup extends IPropertyGroup {
    type: FilterType
    list: Array<IListFilter> | IRangeFilter
}

export interface IRangeFilter {
    from: number;
    to: number;
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
