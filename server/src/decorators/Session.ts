import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ISession } from '@interfaces/Session';

type TSessionKey = keyof ISession;

/**
 * @description get session key or full session object
 * @param data one of session's key
 * @warning getting and setting the key w'll not change session. To CRUD session outside decorator You must get all session object
 */
export const Session = createParamDecorator(
    (data: TSessionKey, ctx: ExecutionContext): TSessionKey | ISession => {
        const session: ISession = ctx.switchToHttp().getRequest().session;

        session.history = session.history || [];

        //@ts-ignore
        return data ? session[data] as TSessionKey : session as ISession;
    }
);
