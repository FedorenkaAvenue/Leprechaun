import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { QueriesCommonI } from './queries.interface';
import { QueriesCommon } from './queries.dto';

/**
 * @description Parse and return query params from URL.
 * @param construct Query constructor. If constructor doesn't exist, uses QueriesCommon.
 * @return An instance of the provided constructor or QueriesCommon by default.
 */
const QueryDecorator = createParamDecorator(
    <T extends new (query: QueriesCommonI) => any>(
        construct: T | null | undefined,
        ctx: ExecutionContext
    ): InstanceType<T> | QueriesCommon => {
        const { query }: Request<any, any, any, QueriesCommonI> = ctx.switchToHttp().getRequest();

        const queries = construct ? new construct(query) : new QueriesCommon(query);

        return queries;
    }
);

export default QueryDecorator;
