import { ProductStatus } from '@enums/Product';
import { SortType } from '@enums/Query';

export interface QueryPriceI {
    min: number;
    max: number;
}

export type DinamicQueryFiltersT = object | null;

// parsed queries
export interface QueriesI {
    sort: SortType;
    page: number;
    portion: number;
    price: QueryPriceI;
    status: ProductStatus;
    dinamicFilters: DinamicQueryFiltersT;
}

// queries from url
export interface QueriesReqI {
    sort: SortType;
    page?: string;
    portion?: string;
    price?: string;
    status?: ProductStatus;
}
