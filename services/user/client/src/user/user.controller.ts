import { UserService } from './user.service';
import { Empty, User, UserDTO, UserList, UserServiceController, UserServiceControllerMethods } from 'gen/ts/user';

@UserServiceControllerMethods()
export class UserController implements UserServiceController {
    constructor(private readonly userService: UserService) { }

    findOne({ id, email }: UserDTO): Promise<User> {
        return this.userService.getUser(id ? { id } : { email });
    }

    async getEmployerList(request: Empty): Promise<UserList> {
        const items = await this.userService.getEmployerList();

        return { items };
    }
}
