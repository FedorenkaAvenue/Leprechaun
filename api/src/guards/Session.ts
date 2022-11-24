import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

/**
 * @description check if session cookie is provided
 */
@Injectable()
export default class SessionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        if (!context.switchToHttp().getRequest().session.ip)
            throw new UnauthorizedException('session cookie is not provided');

        return true;
    }
}
