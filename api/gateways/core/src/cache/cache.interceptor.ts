import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Response } from 'express';

import CacheService from "./cache.service";

/**
 * @description clear cache after success responce
 */
@Injectable()
export class CacheClearInterceptor implements NestInterceptor {
    constructor(private readonly cacheService: CacheService) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            tap(() => {
                const httpContext = context.switchToHttp();
                const response = httpContext.getResponse<Response>();

                if (response.statusCode <= 300) this.cacheService.resetCache();
            }),
        );
    }
}
