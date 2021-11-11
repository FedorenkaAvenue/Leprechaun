import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { Observable, tap, map } from 'rxjs';

import { PaginationResultDTO } from '@dto/Pagination';

@Injectable()
export class EmptyResultInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<PaginationResultDTO<any>> {
        return next
            .handle()
            .pipe(
                tap(({ data }: PaginationResultDTO<any>) => {
                    if (!data.length) throw new NotFoundException('бля..либо пагинация, либо хуй пойми чё');
                })
            );
    }
}

/**
 * @description check if DB value responce === undefined and throw NotFoundException
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
