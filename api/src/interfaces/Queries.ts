import { ProductStatusE } from '@enums/Product';
import { SortProductE, SortWishlistE } from '@enums/Query';
import { PropertyI } from './Property';
import { PropertyGroupI } from './PropertyGroup';

// all possible queries from url
export interface QueriesReqI {
    lang?: string;
    sort?: SortProductE;
    page?: string;
    portion?: string;
    price?: string;
    status?: ProductStatusE;
    substring?: string;
    [dynamicFilter: string]: any;
}

export interface QueryPriceI {
    min: number;
    max: number;
}

export interface QueryCommonFiltersI {
    price: QueryPriceI;
    status: ProductStatusE;
}

export type QueryDynamicFiltersT = {
    [key: PropertyGroupI['alt_name']]: Array<PropertyI['alt_name']>
};

export interface QueriesCommonI {
    lang: string;
}

export interface QueriesProductListI extends QueriesCommonI {
    sort: SortProductE;
    page: number;
    portion: number;
    commonFilters: QueryCommonFiltersI;
    dynamicFilters: QueryDynamicFiltersT;
}

export interface QueriesWishlistI extends QueriesCommonI {
    sort: SortWishlistE;
}

export interface QueriesSearchI extends QueriesCommonI {
    substring: string;
}
