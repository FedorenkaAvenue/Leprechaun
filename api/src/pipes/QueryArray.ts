import { PipeTransform, Injectable } from '@nestjs/common';

import { QueryGETList } from '@dto/Queries/constructor';

/**
 * @description transform query param as string-array to array
 */
@Injectable()
export class QueryArrayPipe implements PipeTransform {
    transform(list: string): QueryGETList['queryList'] {
        return new QueryGETList(list).queryList;
    }
}
