import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ICookies } from '@interfaces/Cookies';
import CookieService from '@services/Cookie';

type TCookieKey = keyof ICookies;

/**
 * @description get cookie key or full cookies object
 * @param data one of cookie's key
 */
export const Cookies = createParamDecorator(
    (data: TCookieKey, ctx: ExecutionContext): TCookieKey | ICookies => {
        const request = ctx.switchToHttp().getRequest();
        const cookies = CookieService.parseRequestCookies(request.cookies);

        return data ? cookies[data] as TCookieKey : cookies as ICookies;
    }
);
