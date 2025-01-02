import { ProductStatusE } from '@enums/Product';
import { ProductSort, WishlistItemsSort } from '@enums/Query';
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
    sort: ProductSort;
    status: ProductStatusE;
    optionsFilter: QueryOptionsFiltersT;
}

export interface QueriesWishlistI<P = QueryPriceI> extends QueriesCommonI<P> {
    wishlist_item_sort: WishlistItemsSort;
}

export interface QueriesSearchI<P = QueryPriceI> extends QueriesCommonI<P> {
    substring: string;
}
