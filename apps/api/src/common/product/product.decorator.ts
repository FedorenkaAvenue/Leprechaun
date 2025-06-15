import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { ProductSort, ProductStatus } from '@gen/product';

/**
 * @description product list queries schema
 */
export const ApiProductListQueriesDecorator = () => {
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
