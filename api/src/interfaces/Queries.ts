import { ProductStatus } from '@enums/Product';
import { SortType } from '@enums/Query';

export interface PriceSearchQueryI {
    min: number;
    max: number;
}

export type DinamicQueryFiltersT = object | null;

// parsed queries
export interface SearchQueriesI {
    sort: SortType;
    page: number;
    price: PriceSearchQueryI | null;
    status: ProductStatus | null;
    dinamicFilters: DinamicQueryFiltersT | null;
}

// queries from url
export interface SearchReqQueriesI {
    sort: SortType;
    page: string | undefined;
    price: string | undefined;
    status: ProductStatus | undefined;
}
