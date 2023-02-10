import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotAcceptableException } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { PaginationResult } from '@dto/Pagination/constructor';

/**
 * @description check incorrect pagination requested page
 * @returns result
 * @throws {NotAcceptableException} invalid pagination page
 */
@Injectable()
export default class InvalidPaginationPageInterceptor implements NestInterceptor {
    intercept(_: ExecutionContext, next: CallHandler): Observable<PaginationResult<any>> {
        return next.handle().pipe(
            tap(({ pagination: { currentPage, pageCount } }: PaginationResult<any>) => {
                if (currentPage > pageCount) throw new NotAcceptableException('invalid pagination page');
            }),
        );
    }
}
