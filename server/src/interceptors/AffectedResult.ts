import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

/**
 * @description check if DB result is not affected and throw NotFoundException
 * @returns 200 or 404
 */
@Injectable()
export default class AffectedResultInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                tap(({ affected }) => {
                    if (!affected) throw new NotFoundException();
                })
                //TODO: rebuild 200 Responce
            ).pipe(
                map(() => { })
            );
    }
}
