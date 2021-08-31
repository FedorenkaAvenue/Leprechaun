import { IProduct } from "@modules/product/index.interface";

export interface IPaginationOptions {
    limit: number
    page: number
}

export interface IPagination {
    currentPage: number
    totalCount: number
    pageCount: number
}

export interface ISearchResult<TResultItem = IProduct> {
    pagination: IPagination
    data: Array<TResultItem>
}
