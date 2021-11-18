export interface IPriceSearchQuery {
    min: number,
    max: number
}

enum SellStatus {
    SOLD = 0,
    SELL
}

export interface DinamicQueryFilters {
    [key: string]: string
}

// parsed queries
export interface ISearchQeuries {
    page: number
    price: IPriceSearchQuery | null
    sell: SellStatus | null
    dinamicFilters: DinamicQueryFilters | null
}

// queries from url
export interface ISearchReqQueries {
    page: string
    price: string
    sell: string
    [key: string]: string // dinamic filters
}
