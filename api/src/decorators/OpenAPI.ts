import { applyDecorators, Type } from '@nestjs/common';
import { ApiNotAcceptableResponse, ApiOkResponse, ApiQuery, getSchemaPath } from '@nestjs/swagger';

import { Pagination } from '@dto/Pagination/constructor';

/**
 * @description pagination schema
 */
export const ApiPaginatedResponseDecorator = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiOkResponse({
            schema: {
                // title: `${model.name}Pagination`,
                properties: {
                    pagination: { $ref: getSchemaPath(Pagination) },
                    data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(model) },
                    },
                },
            },
        }),
        ApiNotAcceptableResponse({
            status: 406,
            description: 'invalid pagination page',
        }),
        ApiQuery({
            name: 'page',
            required: false,
            description: 'page number',
            type: 'number',
        }),
        ApiQuery({
            name: 'postion',
            required: false,
            description: 'amount of item by one page (default = 10)',
            type: 'number',
        }),
    );
};
