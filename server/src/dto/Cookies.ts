import { CookieSortType, ICookies } from "@interface/Cookies";

/**
 * @description DTO for cookie's default values
 * @param sort sort type
 * @param portion item count per page
 */
export class CookieDTO implements ICookies {
    sort: number
    portion: number

    constructor({ sort, portion }: ICookies) {
        this.sort = sort || CookieSortType.POPULAR;
        this.portion = portion || 10;
    }
}
