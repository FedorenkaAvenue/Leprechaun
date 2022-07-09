import { ProductStatus } from '@enums/Product';
import { SortType } from '@enums/Query';

export interface IPriceSearchQuery {
    min: number,
    max: number
}

export type DinamicQueryFilters = object | null;

// parsed queries
export interface ISearchQueries {
    sort: SortType
    page: number
    price: IPriceSearchQuery | null
    status: ProductStatus | null
    dinamicFilters: DinamicQueryFilters | null
}

// queries from url
export interface ISearchReqQueries {
    sort: SortType
    page: string | undefined
    price: string | undefined
    status: ProductStatus | undefined
}
