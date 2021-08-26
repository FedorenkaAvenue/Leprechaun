import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotAcceptableException } from "@nestjs/common";
import { Observable, tap } from "rxjs";

import { ISearchResult } from "@interface/search";

@Injectable()
export class PaginationEmptyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ISearchResult> {
        return next
            .handle()
            .pipe(
                tap(({ data }: ISearchResult) => {
                    if (!data.length) throw new NotAcceptableException();
                })
            );
    }
}
