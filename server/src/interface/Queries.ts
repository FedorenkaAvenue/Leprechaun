export interface ISearchQeuries {
    page: number
    filters: Array<number> | null
}

// queries from ulr
export interface ISearchReqQueries {
    page: string
    filters: string
}
