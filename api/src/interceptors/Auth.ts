import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";
import { Response } from 'express';

import { JWTSuccessTokensI } from "@interfaces/JWT";
import { singleConfigService } from "@services/Config";
import { AuthSuccessDTO } from "@dto/Auth";

/**
 * @description set refresh token to cookie and exclude it from body response
 */
export class AuthJWTMapInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<AuthSuccessDTO>> {
        const res = context.switchToHttp().getResponse() as Response;

        return next.handle().pipe(
            tap(({ refreshToken }: JWTSuccessTokensI) => {
                res.cookie('refreshToken', refreshToken, singleConfigService.getJWTRefreshTokenCookieOptions());
            }),
            map(({ accessToken }: JWTSuccessTokensI) => ({ accessToken })),
        );
    }
}
