import { ProductStatus } from './Product';

export interface IPriceSearchQuery {
    min: number,
    max: number
}

export type DinamicQueryFilters = object | null;

// parsed queries
export interface ISearchQueries {
    page: number
    price: IPriceSearchQuery | null
    status: ProductStatus | null
    dinamicFilters: DinamicQueryFilters | null
}

// queries from url
export interface ISearchReqQueries {
    page: string | undefined
    price: string | undefined
    status: ProductStatus | undefined
}
