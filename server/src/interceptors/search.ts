import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotAcceptableException } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { PaginationResultDTO } from '@dto/Pagination';

@Injectable()
export class PaginationEmptyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<PaginationResultDTO<any>> {
        return next
            .handle()
            .pipe(
                tap(({ data }: PaginationResultDTO<any>) => {
                    if (!data.length) throw new NotAcceptableException();
                })
            );
    }
}
