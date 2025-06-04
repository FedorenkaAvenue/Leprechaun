import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, MoreThanOrEqual, Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import UserEntity from './user.entity';
import { User } from './user.interface';
import { UserRole } from 'gen/ts/user';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) protected readonly userRepo: Repository<UserEntity>,
    ) { }

    public async getUser(options: FindOptionsWhere<UserEntity>): Promise<User> {
        const user = await this.userRepo.findOneBy(options);

        if (!user) throw new RpcException({ code: status.NOT_FOUND, message: 'User not found' });

        return user
    }

    public async getEmployerList(): Promise<User[]> {
        return await this.userRepo.findBy({ role: MoreThanOrEqual(UserRole.SUPPORT) });
    }
}
