import { Injectable } from '@nestjs/common';

import { SessionI } from '@interfaces/Session';
import { UserPublic } from '@dto/User/constructor';
import UserService from '.';

@Injectable()
export default class UserPublicService extends UserService {
    async getUserData(sid: SessionI['sid']): Promise<UserPublic> {
        return new UserPublic({ session: sid });
    }
}
