import { IProperty } from './Property';
import { IPropertyGroup } from './PropertyGroup';
import { FilterType } from '@enums/Filter';

export interface IFilters {
    price: IFilterRangeGroup;
    dinamicFilters: Array<IFilterGroup>;
    status: IFilterListGroup;
}

export type IFilterGroup = IPropertyGroup;

export interface IFilterListGroup extends IFilterGroup {
    type: FilterType.List;
    list: Array<IListFilter>;
}

export interface IFilterRangeGroup extends IFilterGroup {
    type: FilterType.Range;
    range: IRangeFilter;
}

export interface IRangeFilter {
    min: number;
    max: number;
}

export interface IListFilter extends IProperty {
    selected: boolean;
    // amount: number
    // available: number
}
