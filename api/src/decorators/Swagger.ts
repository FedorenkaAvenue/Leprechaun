import { applyDecorators, Type } from '@nestjs/common';
import { ApiNotAcceptableResponse, ApiOkResponse, ApiQuery, getSchemaPath } from '@nestjs/swagger';

import { SortE } from '@enums/Query';
import { ProductStatusE } from '@enums/Product';
import { Pagination } from '@dto/Pagination/constructor';

/**
 * @description successful responce documentation for OpenAPI
 */
const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
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
            name: 'sort',
            required: false,
            description: 'sort number',
            enum: SortE,
        }),
        ApiQuery({
            name: 'status',
            required: false,
            description: 'include product statuses',
            enum: ProductStatusE,
        }),
    );
};

export default ApiPaginatedResponse;
