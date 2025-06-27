import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/**
 * @description get user credentials from request
 * @param {keyof Pick<Request, 'userId' | 'userPayload'>} key user or userPayload
 * @return user Id and user payload from JWT (if existst)
 */

const Credentials = createParamDecorator(
    (key: keyof Pick<Request, 'userId' | 'userPayload'>, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest<Request>();

        return req[key];
    },
);

export default Credentials;
