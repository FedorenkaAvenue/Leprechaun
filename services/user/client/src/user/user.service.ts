import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, MoreThanOrEqual, Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { from, Observable, of } from 'rxjs';

import UserEntity from './user.entity';
import { User, UserRole } from 'gen/user';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) protected readonly userRepo: Repository<UserEntity>) { }

    public createSessionUser(): Observable<User> {
        return from(this.userRepo.save({ isAuth: false }));
    }

    public async getUserPrivate(options: FindOptionsWhere<UserEntity>): Promise<User> {
        const user = await this.userRepo.findOneBy(options);

        if (!user) throw new RpcException({ code: status.NOT_FOUND, message: 'User not found' });

        return user
    }

    public async getEmployerListPrivate(): Promise<User[]> {
        return await this.userRepo.findBy({ role: MoreThanOrEqual(UserRole.SUPPORT) });
    }
}
