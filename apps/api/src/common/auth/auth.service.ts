import { Inject, Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

import { AuthSignInDTO } from "./auth.dto";
import { AUTH_SERVICE_NAME, AuthServiceClient, AuthJWT } from "@gen/auth";
import { AUTH_PACKAGE } from "./auth.constants";

@Injectable()
export default class AuthService implements OnModuleInit {
    private authServiceClient: AuthServiceClient;

    constructor(@Inject(AUTH_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.authServiceClient = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    public async signIn(payload: AuthSignInDTO): Promise<AuthJWT> {
        try {
            const res = await lastValueFrom(this.authServiceClient.signIn({ ...payload }));

            return res;
        } catch (err: any) {
            throw new NotFoundException('invalid credentials');
        }
    }
}
