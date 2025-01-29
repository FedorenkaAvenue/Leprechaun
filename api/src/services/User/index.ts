import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import UserEntity from "@entities/User";
import { UserI } from "@interfaces/User";

@Injectable()
export default class UserService {
    constructor(
        @InjectRepository(UserEntity) protected readonly userRepo: Repository<UserEntity>,
    ) { }

    public async getUser(email: UserI['email']): Promise<UserEntity | null> {
        return await this.userRepo.findOneBy({ email: email || undefined });
    }
}
