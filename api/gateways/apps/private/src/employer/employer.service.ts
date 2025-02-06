import { Injectable, NotFoundException } from "@nestjs/common";
import { MoreThanOrEqual, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { UserDataI, UserI } from "@core/user/user.interface";
import { UserRole } from "@core/user/user.enum";
import UserEntity from '@core/user/user.entity';
import { UserDataDTO } from "@core/user/user.dto";

@Injectable()
export default class EmployerService {
    constructor(
        @InjectRepository(UserEntity) protected readonly userRepo: Repository<UserEntity>,
    ) { }

    public async getEmployerOwnData(id: UserI['id']): Promise<UserDataI> {
        const user = await this.userRepo.findOneBy({ id });

        if (!user) throw new NotFoundException('user not found');

        return new UserDataDTO(user);
    }

    public async getEmployerList(): Promise<UserDataDTO[]> {
        const res = await this.userRepo.findBy({ role: MoreThanOrEqual(UserRole.SUPPORT) });

        return res.map(user => new UserDataDTO(user));
    }
}
