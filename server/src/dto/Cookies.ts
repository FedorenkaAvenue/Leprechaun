import { ICookies } from '@interfaces/Cookies';

/**
 * @description DTO for cookie's default values
 * @param portion item count per page
 */
export class CookieDTO implements ICookies {
    sort: number;
    portion: number;
    session: string;

    constructor({ portion, session }: ICookies) {
        this.portion = Number(portion) || 10;
        this.session = session || null;
    }
}
