import { Observable } from 'rxjs';

import { UserService } from './user.service';
import {
    User, UserSearchParams, UserServiceController, UserServiceControllerMethods, UserListPrivate,
} from 'gen/user';

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
