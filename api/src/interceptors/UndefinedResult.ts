import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

/**
 * @description check if DB value responce === undefined or null
 * @returns return result
 * @throws {NotFoundException} DB value responce === undefined
 */
@Injectable()
export default class NotFoundInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(data => {
                if (data === undefined || data === null) throw new NotFoundException();
            }),
        );
    }
}
