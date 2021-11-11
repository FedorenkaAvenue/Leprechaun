import { applyDecorators, Type } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PaginationDTO } from '@dto/Pagination';

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
	return applyDecorators(
		ApiOkResponse({
			schema: {
				// title: `${model.name}Pagination`,
				properties: {
					pagination: { $ref: getSchemaPath(PaginationDTO) },
					data: {
						type: 'array',
						items: { $ref: getSchemaPath(model) },
					}
				}
			}
		}),
		ApiNotFoundResponse({
			status: 404,
			description: 'pagination page not found'
		})
	);
};
