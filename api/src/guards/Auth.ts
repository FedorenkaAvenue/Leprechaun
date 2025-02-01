import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { singleConfigService } from '@services/Config';

/**
 * @description check if session cookie is provided
 * @throws {UnauthorizedException} session cookie is not provided
 */
@Injectable()
export default class AuthSessionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        if (!context.switchToHttp().getRequest().session.ip) {
            throw new UnauthorizedException('session cookie is not provided');
        }

        return true;
    }
}

/**
 * @description check user JWT access token. Pin user data from payload to request
 */
@Injectable()
export class AuthJWTAccessGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                { secret: singleConfigService.getJWTAccessTokenOptions().secret },
            );

            request['user'] = payload;
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
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as Request;
        const refreshToken = request.cookies.refreshToken;

        if (!refreshToken) throw new UnauthorizedException('refresh token is not provided');

        try {
            const payload = await this.jwtService.verifyAsync(
                refreshToken,
                { secret: singleConfigService.getJWTRefreshTokenOptions().secret },
            );

            request['user'] = payload;
        } catch (err) {
            throw new UnauthorizedException('invalid refresh token');
        }

        return true;
    }
}
