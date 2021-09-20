export interface IPriceSearchQuery {
    from: number,
    to: number
}

export interface ISearchQeuries {
    page: number
    price: IPriceSearchQuery
    filters: Array<number> | null
}

// queries from ulr
export interface ISearchReqQueries {
    page: string
    price: string
    filters: string
}
