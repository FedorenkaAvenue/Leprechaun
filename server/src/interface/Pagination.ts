export interface IPaginationOptions {
    limit: number
    pageNumber: number
}

export interface IPagination {
    currentPage: number
    totalCount: number
    pageCount: number
}
