import { ProductStatusE } from '@enums/Product';
import { SortProductE, SortWishlistE } from '@enums/Query';

export interface QueryPriceI {
    min: number;
    max: number;
}

export type DinamicQueryFiltersT = object | null;

// queries from url
export interface QueriesReqI {
    lang?: string;
    sort?: SortProductE;
    page?: string;
    portion?: string;
    price?: string;
    status?: ProductStatusE;
}

// parsed queries
export interface QueriesCommonI {
    lang: string;
}

export interface QueriesProductListI extends QueriesCommonI {
    sort: SortProductE;
    page: number;
    portion: number;
    price: QueryPriceI;
    status: ProductStatusE;
    dinamicFilters: DinamicQueryFiltersT;
}

export interface QueriesWishlistI extends QueriesCommonI {
    sort: SortWishlistE;
}
