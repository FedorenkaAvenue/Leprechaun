import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

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
