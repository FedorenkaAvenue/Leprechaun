import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Observable, tap, map } from 'rxjs';

import { PaginationResultDTO } from '@dto/Pagination';
import { ISearchReqQueries } from '@interfaces/Queries';

/**
 * @description check incorrect pagination requested page
 * @returns result or 406
 */
@Injectable()
export class EmptyPaginationPageInterceptor implements NestInterceptor {
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

/**
 * @description check if DB value responce === undefined and throw NotFoundException
 * @returns return result or 404
 */
@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                tap(data => {
                    if (data === undefined) throw new NotFoundException();
                })
            );
    }
}
 
 /**
  * @description check if DB result is not affected and throw NotFoundException
  * @returns 200 or 404
  */
@Injectable()
export class AffectedInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                tap(({ affected }) => {
                    if (!affected) throw new NotFoundException();
                })
            //TODO: rebuild 200 Responce
            ).pipe(
                map(() => {})
            );
    }
}
