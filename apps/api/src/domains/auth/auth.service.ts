import { Inject, Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

import { AuthServiceClient, JWTSuccessTokensI } from "./auth.interface";
import { AuthSignInDTO } from "./auth.dto";

@Injectable()
export default class AuthService implements OnModuleInit {
    private authServiceClient: AuthServiceClient;

    constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.authServiceClient = this.client.getService<AuthServiceClient>('AuthService');
    }

    public async signIn(payload: AuthSignInDTO): Promise<JWTSuccessTokensI> {
        try {
            const res = await lastValueFrom(this.authServiceClient.SignIn({ ...payload }));

            return res;
        } catch (err: any) {
            throw new NotFoundException('invalid credentials');
        }
    }
}
