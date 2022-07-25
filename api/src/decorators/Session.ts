import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ISession } from '@interfaces/Session';
import { UserSession } from '@dto/Session/constructor';

/**
 * @description get session object
 * @warning getting and setting the key w'll not change session.
 *  To CRUD session outside decorator You must get all session object
 */
export const Session = createParamDecorator(
    (_: any, ctx: ExecutionContext): ISession => {
        const req = ctx.switchToHttp().getRequest();

        req.session = Object.assign(req.session, new UserSession(req.session));

        return req.session;
    }
);
