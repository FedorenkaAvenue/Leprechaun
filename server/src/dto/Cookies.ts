import { CookieSortType, ICookies } from '@interfaces/Cookies';

/**
 * @description DTO for cookie's default values
 * @param sort sort type
 * @param portion item count per page
 */
export class CookieDTO implements ICookies {
    sort: number;
    portion: number;
    session: string;

    constructor({ sort, portion, session }: ICookies) {
        this.sort = Number(sort) || CookieSortType.POPULAR;
        this.portion = Number(portion) || 10;
        this.session = session || null;
    }
}
