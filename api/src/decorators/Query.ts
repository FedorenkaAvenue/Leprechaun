import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { QueriesReqI } from '@interfaces/Queries';
import { QueriesCommon } from '@dto/Queries/constructor';

/**
 * @description parse and return query params from url
 * @param {String} construct query constructor. if constructor doesn't exist, uses QueriesCommon
 * @return one of query param or full query params object
 */
const QueryCommonDecorator = createParamDecorator((construct: { new (...args: any[]): any }, ctx: ExecutionContext) => {
    const { query }: Request<any, any, any, QueriesReqI> = ctx.switchToHttp().getRequest();
    const queries = construct ? new construct(query) : new QueriesCommon(query);

    return queries;
});

export default QueryCommonDecorator;
