import { ICookies } from '@interfaces/Cookies';

export class CookieDTO implements ICookies {
    sort: number;
    portion: number;
    session: string;
}
