import { UserService } from './user.service';
import { User, UserDTO, UserServiceController, UserServiceControllerMethods } from 'gen/ts/user';

@UserServiceControllerMethods()
export class UserController implements UserServiceController {
    constructor(private readonly userService: UserService) { }

    findOne({ id, email }: UserDTO): Promise<User> {
        return this.userService.getUser(id ? { id } : { email });
    }
}
