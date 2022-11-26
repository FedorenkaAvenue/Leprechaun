import { ProductStatusE } from '@enums/Product';
import { SortProductE } from '@enums/Query';

export interface QueryPriceI {
    min: number;
    max: number;
}

export type DinamicQueryFiltersT = object | null;

// parsed queries
export interface QueriesI {
    sort: SortProductE;
    page: number;
    portion: number;
    price: QueryPriceI;
    status: ProductStatusE;
    dinamicFilters: DinamicQueryFiltersT;
}

// queries from url
export interface QueriesReqI {
    sort: SortProductE;
    page?: string;
    portion?: string;
    price?: string;
    status?: ProductStatusE;
}
