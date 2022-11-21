import { PropertyI } from './Property';
import { PropertyGroupI } from './PropertyGroup';
import { FilterType } from '@enums/Filter';

export interface FiltersI {
    price: FilterRangeGroupI;
    dinamicFilters: FilterGroupT[];
    status: FilterListGroupI;
}

export type FilterGroupT = PropertyGroupI;

export interface FilterListGroupI extends FilterGroupT {
    type: FilterType.List;
    list: ListFilterI[];
}

export interface FilterRangeGroupI extends FilterGroupT {
    type: FilterType.Range;
    range: RangeFilterI;
}

export interface RangeFilterI {
    min: number;
    max: number;
}

export interface ListFilterI extends PropertyI {
    selected: boolean;
    // amount: number
    // available: number
}
