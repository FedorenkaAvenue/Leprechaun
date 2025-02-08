import { Injectable, NotFoundException } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import UserEntity from "./user.entity";
import { UserI } from "./user.interface";

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
