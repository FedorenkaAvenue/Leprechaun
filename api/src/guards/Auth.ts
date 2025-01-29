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
 * @description check user JWT token
 */
@Injectable()
export class AuthJWTGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                { secret: singleConfigService.getJWTConfig().secret },
            );

            request['user'] = payload;
        } catch (err) {
            console.log(err);

            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}
