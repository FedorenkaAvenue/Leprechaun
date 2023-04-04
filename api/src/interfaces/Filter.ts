import FilterE from '@enums/Filter';
import { PropertyPublicI } from './Property';
import { PropertyGroupPublicI } from './PropertyGroup';

export interface FilterI<D = unknown> {
    type: FilterE;
    data: D;
}

// FilterE.LIST

export interface FilterListItemI {
    property: PropertyPublicI;
    count: number;
}

export interface FilterListI {
    group: PropertyGroupPublicI;
    list: FilterListItemI[];
}

// FilterE.RANGE
