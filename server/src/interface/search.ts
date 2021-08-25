import { IProduct } from "@modules/product/index.interface";

export interface IPaginationOptions {
    limit: number
    page: number
}

export interface ISearchResult<TResultItem = IProduct> {
    currentPage: number
    resultCount: number
    result: Array<TResultItem>
}
