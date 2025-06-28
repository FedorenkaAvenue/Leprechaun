// auth-cookie.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

export function UnknownUserResponce(resp: any) {
    @Injectable()
    class UnknownUserResponceGuard implements CanActivate {
        canActivate(context: ExecutionContext): boolean {
            const ctx = context.switchToHttp();

            if (ctx.getRequest<Request>().userId) return true;

            ctx.getResponse<Response>().status(200).json(resp);

            return false;
        }
    }

    return UnknownUserResponceGuard;
}
