import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { AUTH_SERVICE_NAME, AuthServiceClient, AuthJWT } from "@fedorenkaavenue/leprechaun_lib_entities/server/auth";

import { AuthSignInDTO } from "./auth.dto";
import { AUTH_PACKAGE } from "./auth.constants";
import { catchResponceError } from "@pipes/operators";

@Injectable()
export default class AuthService implements OnModuleInit {
    private authServiceClient: AuthServiceClient;

    constructor(@Inject(AUTH_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.authServiceClient = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    public async signIn(payload: AuthSignInDTO): Promise<AuthJWT> {
        return await lastValueFrom(this.authServiceClient.signIn({ ...payload }).pipe(catchResponceError));
    }
}
