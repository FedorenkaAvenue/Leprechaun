export interface IPriceSearchQuery {
    from: number,
    to: number
}

enum SellStatus {
    SOLD = 0,
    SELL
}

export interface ISearchQeuries {
    page: number
    price: IPriceSearchQuery | null
    sell: SellStatus | null
    filters: Array<number> | null
}

// queries from ulr
export interface ISearchReqQueries {
    page: string
    price: string
    sell: string
    filters: string
}
