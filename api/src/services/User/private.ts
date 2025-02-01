import { Injectable, NotFoundException } from "@nestjs/common";

import { UserDataI, UserI } from "@interfaces/User";
import { UserDataDTO } from "@dto/User";
import UserService from ".";

@Injectable()
export default class UserPrivateService extends UserService {
    public async getUser(id: UserI['id']): Promise<UserDataI> {
        const user = await this.userRepo.findOneBy({ id });

        if (!user) throw new NotFoundException('user not found');

        return new UserDataDTO(user);
    }
}
