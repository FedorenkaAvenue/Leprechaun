import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { QueriesCommon } from './queries.dto';

/**
 * @description Parse and return query params from URL.
 * @param construct Query constructor. If constructor doesn't exist, uses QueriesCommon.
 * @return An instance of the provided constructor or QueriesCommon by default.
 */
const QueryDecorator = createParamDecorator(
    <T extends new (query: QueriesCommon) => any>(
        construct: T | null | undefined,
        ctx: ExecutionContext
    ): InstanceType<T> | QueriesCommon => {
        const { query }: Request<any, any, any, QueriesCommon> = ctx.switchToHttp().getRequest();

        const queries = construct ? new construct(query) : new QueriesCommon(query);

        return queries;
    }
);

export default QueryDecorator;
