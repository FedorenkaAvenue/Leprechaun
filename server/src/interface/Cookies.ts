export enum CookieSortType {
    POPULAR = 1,
    PRICE_UP = 2,
    PRICE_DOWN = 3
}

export interface ICookies {
    sort: CookieSortType
    portion: number
}
