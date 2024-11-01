export default interface PaginationModel<D> {
    data: D
    pagination: {
        currentPage: number
        pageCount: number
        totalCount: number
    }
}
