import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

import ConfigService from "@modules/config/config.service";

/**
 * @description check user JWT access token. Pin user data from payload to request
 */
@Injectable()
export class AuthJWTAccessGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as Request;
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                { secret: this.configService.getJWTAccessTokenOptions().secret },
            );

            request.userId = payload.id;
            request.userPayload = payload;
        } catch (err) {
            throw new UnauthorizedException('invalid access token');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}

/**
 * @description check if JWT refresh token exists and valid. Pin user data from payload to request
 */
@Injectable()
export class AuthJWTRefreshGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as Request;
        const refreshToken = request.cookies.refreshToken;

        if (!refreshToken) throw new UnauthorizedException('refresh token is not provided');

        try {
            const payload = await this.jwtService.verifyAsync(
                refreshToken,
                { secret: this.configService.getJWTRefreshTokenOptions().secret },
            );

            request.userId = payload.id;
            request.userPayload = payload;
        } catch (err) {
            throw new UnauthorizedException('invalid refresh token');
        }

        return true;
    }
}
