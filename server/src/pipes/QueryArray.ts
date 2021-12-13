import { PipeTransform, Injectable } from '@nestjs/common';

import { QueryGETListDTO } from '@dto/Queries';

/**
 * @description transform query param as string-array to array
 */
@Injectable()
export class QueryArrayPipe implements PipeTransform {
	transform(list: string): QueryGETListDTO['queryList'] {
        return new QueryGETListDTO(list).queryList;
	}
}
