import { ProductStatusE } from '@enums/Product';
import { SortProductE, SortWishlistE } from '@enums/Query';
import { PropertyI } from './Property';
import { PropertyGroupI } from './PropertyGroup';

export interface QueryPriceI {
    min: number;
    max: number;
}

export type QueryOptionsFiltersT = {
    [key: string]: string | number
};

export interface QueriesCommonI<P = QueryPriceI> {
    lang: string;
    price: P;
    page: number;
    portion: number;
}

export interface QueriesProductListI<P = QueryPriceI> extends QueriesCommonI<P> {
    sort: SortProductE;
    status: ProductStatusE;
    optionsFilter: QueryOptionsFiltersT;
}

export interface QueriesWishlistI<P = QueryPriceI> extends QueriesCommonI<P> {
    sort: SortWishlistE;
}

export interface QueriesSearchI<P = QueryPriceI> extends QueriesCommonI<P> {
    substring: string;
}
