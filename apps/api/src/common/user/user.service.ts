import { Inject, Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

import { User, USER_SERVICE_NAME, UserServiceClient } from "@gen/user";
import { UserDataDTO } from "./user.dto";
import { USER_PACKAGE } from "./user.constants";
import { catchResponceError } from "@pipes/operators";

@Injectable()
export default class UserService implements OnModuleInit {
    private userService: UserServiceClient;

    constructor(@Inject(USER_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
    }

    public async getUser(id: User['id']): Promise<UserDataDTO> {
        const user = await firstValueFrom(this.userService.findOne({ id }).pipe(catchResponceError));

        if (!user) throw new NotFoundException('user not found');

        return new UserDataDTO(user);
    }

    public async getEmployerList(): Promise<UserDataDTO[]> {
        const { items } = await firstValueFrom(this.userService.getEmployerList({}).pipe(catchResponceError));

        return items.map(user => new UserDataDTO(user));
    }
}
