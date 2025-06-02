import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

import { AuthSuccessDTO, SignInDTO } from './auth.interface';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @GrpcMethod('AuthService', 'SignIn')
    async signIn(payload: SignInDTO, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<AuthSuccessDTO> {
        return await this.authService.sigIn(payload);
    }
}
