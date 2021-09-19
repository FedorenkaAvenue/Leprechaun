import { CookieSortType, ICookies } from "@interface/Cookies";

export class CookieDTO implements ICookies {
    sort: number
    portion: number

    constructor({ sort, portion }: ICookies) {
        this.sort = sort || CookieSortType.POPULAR;
        this.portion = portion || 10;
    }
}
