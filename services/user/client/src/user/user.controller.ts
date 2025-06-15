import { UserService } from './user.service';
import { User, UserSearchParams, UserList, UserServiceController, UserServiceControllerMethods } from 'gen/user';

@UserServiceControllerMethods()
export class UserController implements UserServiceController {
    constructor(private readonly userService: UserService) { }

    findOne({ id, email }: UserSearchParams): Promise<User> {
        return this.userService.getUser(id ? { id } : { email });
    }

    async getEmployerList(): Promise<UserList> {
        const items = await this.userService.getEmployerList();

        return { items };
    }
}
