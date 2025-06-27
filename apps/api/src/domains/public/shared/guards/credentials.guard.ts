import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

/**
 * @description check if session or user auth credentials are provided
 * @throws {UnauthorizedException} credentials are not provided
 */
@Injectable()
export default class CredentialsGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        if (!(context.switchToHttp().getRequest() as Request).userId) {
            throw new UnauthorizedException('unknown user credentials');
        }

        return true;
    }
}
