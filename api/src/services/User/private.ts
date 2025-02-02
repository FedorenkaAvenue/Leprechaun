import { Injectable, NotFoundException } from "@nestjs/common";
import { MoreThanOrEqual } from "typeorm";

import { UserDataI, UserI } from "@interfaces/User";
import { UserDataDTO } from "@dto/User";
import UserService from ".";
import { UserRole } from "@enums/User";

@Injectable()
export default class UserPrivateService extends UserService {
    public async getUser(id: UserI['id']): Promise<UserDataI> {
        const user = await this.userRepo.findOneBy({ id });

        if (!user) throw new NotFoundException('user not found');

        return new UserDataDTO(user);
    }

    public async getEmployerList(): Promise<UserDataDTO[]> {
        const res = await this.userRepo.findBy({ role: MoreThanOrEqual(UserRole.SUPPORT) });

        return res.map(user => new UserDataDTO(user));
    }
}
