import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotAcceptableException } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { PaginationResultDTO } from '@dto/Pagination';
import { ISearchReqQueries } from '@interfaces/Queries';

/**
 * @description check incorrect pagination requested page
 * @returns result or 406
 */
@Injectable()
export default class InvalidPaginationPageInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<PaginationResultDTO<any>> {
        const { page } = context.getArgs()[0].query as ISearchReqQueries;

        return next
            .handle()
            .pipe(
                tap(({ pagination: { currentPage, pageCount } }: PaginationResultDTO<any>) => {
                    if (page && currentPage > pageCount) throw new NotAcceptableException('invalid pagination page');
                })
            );
    }
}
