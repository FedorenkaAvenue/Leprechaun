import { ICookies } from '@interfaces/Cookies';
import { CookieDTO } from '@dto/Cookies';

/**
 * @description parse and map cookies
 */
class CookieService {
    /**
     * @description get request's cookies and parse them
     * @param cookies request cookies
     * @returns parsed cookies with default values
     */
    parseRequestCookies(cookies: ICookies): CookieDTO {
        return new CookieDTO(cookies);
    }
}

export default new CookieService();
