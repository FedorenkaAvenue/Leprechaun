import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { QueriesI, QueriesReqI } from '@interfaces/Queries';
import { Queries } from '@dto/Queries/constructor';

type TQueryParam = keyof QueriesI<unknown>;

/**
 * @description parse and return query params from url
 * @param {String} data one of query param's param
 * @return one of query param or full query params object
 */
const QueryDecorator = createParamDecorator((data: TQueryParam, ctx: ExecutionContext) => {
    const { query }: Request<any, any, any, QueriesReqI> = ctx.switchToHttp().getRequest();
    const queries = new Queries(query);

    return data ? queries[data] : queries;
});

export default QueryDecorator;
