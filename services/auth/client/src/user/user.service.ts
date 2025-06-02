import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

import { User, UserGRPCService } from "./user.interface";
import { SignInDTO } from "../auth/auth.interface";

@Injectable()
export default class UserService implements OnModuleInit {
    private heroesService: UserGRPCService;

    constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.heroesService = this.client.getService<UserGRPCService>('UserService');
    }

    getUser(payload: SignInDTO): Observable<User> {
        return this.heroesService.findOne(payload);
    }
}
