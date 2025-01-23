import { applyDecorators, Type } from '@nestjs/common';
import { ApiNotAcceptableResponse, ApiOkResponse, ApiQuery, getSchemaPath } from '@nestjs/swagger';

import { Pagination } from '@dto/Pagination';
import { ProductSort } from '@enums/Query';
import { ProductStatus } from '@enums/Product';

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
            name: 'portion',
            required: false,
            description: 'amount of item by one page (default = 10)',
            type: 'number',
        }),
    );
};

/**
 * @description product list queries schema
 */
export const ApiProductListQueries = () => {
    return applyDecorators(
        ApiQuery({
            name: 'sort',
            required: false,
            enum: ProductSort,
        }),
        ApiQuery({
            name: 'status',
            required: false,
            enum: ProductStatus,
        }),
        ApiQuery({
            name: 'category',
            required: false,
            type: String,
            description: 'category url',
        }),
        ApiQuery({
            name: 'price',
            required: false,
            type: String,
            description: 'price range TODO', // TODO
        }),
    );
};
