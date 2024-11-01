export interface PaginationModel<D> {
    pagination: {
        currentPage: number,
        totalCount: number,
        pageCount: number,
    },
    data: D[],
}
