export interface IPaginationOptions {
    limit: number
    pageNumber: number
}

export interface IPagination {
    currentPage: number
    totalCount: number
    pageCount: number
}

export interface ICreatePagintaion {
    totalCount: number
    currentPage: number
    itemPortion: number
}

export interface IPaginationResult<TDataResult> {
    pagination: IPagination
    data: Array<TDataResult>
}
