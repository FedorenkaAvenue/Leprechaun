import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

import { ISearchResult } from "@interface/search";

@Injectable()
export class PaginationEmptyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ISearchResult> {
        return next
            .handle()
            .pipe(
                tap(({ result }) => {
                    if (!result.length) throw new NotFoundException();
                })
            );
    }
}
