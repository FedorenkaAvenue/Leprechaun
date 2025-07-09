import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom, Observable } from "rxjs";
import { User, USER_SERVICE_NAME, UserServiceClient } from "@fedorenkaavenue/leprechaun_lib_entities/server/user";

import { USER_PACKAGE } from "./user.constants";
import { catchResponceError } from "@pipes/operators";

@Injectable()
export default class UserService implements OnModuleInit {
    private userService: UserServiceClient;

    constructor(@Inject(USER_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
    }

    public async getUserPrivate(id: User['id']): Promise<User> {
        return await firstValueFrom(this.userService.getUserPrivate({ id }).pipe(catchResponceError));
    }

    public async getEmployerListPrivate(): Promise<User[]> {
        const { items } = await firstValueFrom(this.userService.getEmployerListPrivate({}).pipe(catchResponceError));

        return items;
    }

    public createSessionUser(): Observable<User> {
        return this.userService.createSessionUser({}).pipe(catchResponceError);
    }
}
