import { Injectable, CanActivate, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { UserRole } from './user.enum';
import { USER_ROLE_KEY } from './user.decorator';

/**
 * @description check user role. if user role less than setted role, return access denied
 */
@Injectable()
export class UserRoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.getAllAndOverride<UserRole>(USER_ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRole) throw new InternalServerErrorException(`UserRoleGuard not found user role`);

        const request = context.switchToHttp().getRequest<Request>();

        return Boolean(request.user && (request.user?.role >= requiredRole));
    }
}
