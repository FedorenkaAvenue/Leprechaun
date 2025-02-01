import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

/**
 * @description check if DB result is not affected and throw NotFoundException
 * @param responceErrMsg unsuccessfull responce message
 * @param httpExeption unsuccessfull responce HTTP exeption type
 * @returns 200
 * @throws operation has no affected result. Default exeption type is NotFoundException
 */
export default function AffectedResultInterceptor(responceErrMsg?: string, httpExeption = NotFoundException): any {
    class AffectedResultInterceptorr implements NestInterceptor {
        intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
            return next
                .handle()
                .pipe(
                    tap(({ affected }) => {
                        if (!affected) throw new httpExeption(responceErrMsg);
                    }),
                    //TODO: rebuild 200 Responce
                )
                .pipe(map(() => { }));
        }
    }

    return AffectedResultInterceptorr;
}
