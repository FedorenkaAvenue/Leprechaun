import { Observable } from 'rxjs';
import {
    User, UserSearchParams, UserServiceController, UserServiceControllerMethods, UserListPrivate,
} from '@fedorenkaavenue/leprechaun_lib_entities/server/user';

import { UserService } from './user.service';

@UserServiceControllerMethods()
export class UserController implements UserServiceController {
    constructor(private readonly userService: UserService) { }

    public createSessionUser(): Observable<User> {
        return this.userService.createSessionUser();
    }

    public getUserPrivate({ id, email }: UserSearchParams): Promise<User> {
        return this.userService.getUserPrivate(id ? { id } : { email });
    }

    public async getEmployerListPrivate(): Promise<UserListPrivate> {
        const items = await this.userService.getEmployerListPrivate();

        return { items };
    }
}
