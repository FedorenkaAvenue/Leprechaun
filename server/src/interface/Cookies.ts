export enum CookieSortType {
    POPULAR = 1,
    PRICE_UP,
    PRICE_DOWN ,
    NEW
}

export interface ICookies {
    sort: CookieSortType
    portion: number
}
