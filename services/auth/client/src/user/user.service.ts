import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

import { User, UserDTO, UserServiceClient } from "gen/ts/user";

@Injectable()
export default class UserService implements OnModuleInit {
    private userService: UserServiceClient;

    constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.userService = this.client.getService<UserServiceClient>('UserService');
    }

    getUser(payload: UserDTO): Observable<User> {
        return this.userService.findOne(payload);
    }
}
