import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'entities/User';
import { IUser } from '@interfaces/User';

@Injectable()
export class UserService {
    constructor(
		@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
	) {}

    getUser(userId: string): Promise<IUser> {
        return this.userRepo.findOne({
            where: { id: userId },
            relations: ['favorite']
        });
    }
}
