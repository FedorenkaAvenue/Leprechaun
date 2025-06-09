import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

import { User, USER_SERVICE_NAME, UserSearchParams, UserServiceClient } from "gen/ts/user";

@Injectable()
export default class UserService implements OnModuleInit {
    private userClient: UserServiceClient;

    constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.userClient = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
    }

    getUser(data: UserSearchParams): Observable<User> {
        return this.userClient.findOne(data);
    }
}
