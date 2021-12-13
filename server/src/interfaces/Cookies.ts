export enum CookieSortType {
    POPULAR = 1,  // most popular first
    PRICE_UP,     // from cheap to expensive
    PRICE_DOWN ,  // from expensive to cheap
    NEW           // most new first
}

export interface ICookies {
    sort?: CookieSortType    // sorting result
    portion?: number         // items amount for pagination
    session?: string         // session ID
}
