import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

/**
 * @description check if DB value responce === undefined
 * @returns return result
 * @throws {NotFoundException} DB value responce === undefined
 */
@Injectable()
export default class UndefinedResultInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(data => {
                if (data === undefined) throw new NotFoundException();
            }),
        );
    }
}
