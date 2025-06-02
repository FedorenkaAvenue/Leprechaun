import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";
import { Response } from 'express';

import { AuthSuccessDTO } from "./auth.dto";
import { JWTSuccessTokensI } from "./auth.interface";
import ConfigService from "@modules/config/config.service";

/**
 * @description set refresh token to cookie and exclude it from body response
 */
@Injectable()
export class AuthJWTMapInterceptor implements NestInterceptor {
    constructor(
        private readonly configService: ConfigService
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<AuthSuccessDTO>> {
        const res = context.switchToHttp().getResponse() as Response;

        return next.handle().pipe(
            tap(({ refreshToken }: JWTSuccessTokensI) => {
                console.log(this.configService);

                res.cookie('refreshToken', refreshToken, this.configService.getJWTRefreshTokenCookieOptions());
            }),
            map(({ accessToken }: JWTSuccessTokensI) => ({ accessToken })),
        );
    }
}
