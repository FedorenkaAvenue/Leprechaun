import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

import UserEntity from "@entities/User";
import { UserI } from "@interfaces/User";

@Injectable()
export default class UserService {
    constructor(
        @InjectRepository(UserEntity) protected readonly userRepo: Repository<UserEntity>,
    ) { }

    /**
     * @description used to get full user data (with password)
     * @param {FindOptionsWhere} options search User entiry fields
     * @returns {UserI} user data
     */
    public async getUserWhere(options: FindOptionsWhere<UserEntity>): Promise<UserI | null> {
        return await this.userRepo.findOneBy(options);
    }
}
