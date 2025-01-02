import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { QueriesCommon } from '@dto/Queries';
import { QueriesCommonI } from '@interfaces/Queries';

/**
 * @description parse and return query params from url
 * @param {String} construct query constructor. if constructor doesn't exist, uses QueriesCommon
 * @return one of query param or full query params object
 */
const QueryDecorator = createParamDecorator((construct: { new(...args: any[]): any }, ctx: ExecutionContext) => {
    const { query }: Request<any, any, any, QueriesCommonI<string>> = ctx.switchToHttp().getRequest();
    const queries = construct ? new construct(query) : new QueriesCommon(query);

    return queries;
});

export default QueryDecorator;
