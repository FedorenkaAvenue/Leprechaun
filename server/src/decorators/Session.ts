import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ISession } from '@interfaces/Session';

/**
 * @description get session object
 * @warning getting and setting the key w'll not change session. To CRUD session outside decorator You must get all session object
 */
export const Session = createParamDecorator(
    (_: any, ctx: ExecutionContext): ISession => {
        const session: ISession = ctx.switchToHttp().getRequest().session;

        session.history = session.history || [];

        return session;
    }
);
