import { CookiesI } from '@interfaces/Cookies';

export class CookieDTO implements CookiesI {
    sort: number;
    portion: number;
    session: string;
}
