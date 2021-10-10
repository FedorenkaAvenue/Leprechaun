import { Injectable } from '@nestjs/common';

import { ICookies } from '@interfaces/Cookies';
import { CookieDTO } from '@dto/Cookies';

@Injectable()
export default class CookieService {
    /**
     * @description get request's cookies and parse them
     * @param cookies request cookies
     * @returns parsed cookies with default values
     */
    parseRequestCookies(cookies: ICookies): CookieDTO {
        return new CookieDTO(cookies);
    }
}
