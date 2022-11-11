import { CookiesI } from '@interfaces/Cookies';
import { CookieDTO } from '.';

/**
 * @description DTO for cookie's default values
 * @param portion item count per page
 */
export class Cookie extends CookieDTO {
    constructor({ portion, session }: CookiesI) {
        super();
        this.portion = Number(portion) || 10;
        this.session = session || null;
    }
}
