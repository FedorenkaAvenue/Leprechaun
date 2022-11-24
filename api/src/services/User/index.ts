import { Injectable } from '@nestjs/common';

import { SessionI } from '@interfaces/Session';
import { UserPublic } from '@dto/User/constructor';
import UserAdminService from './admin';

@Injectable()
export default class UserService extends UserAdminService {
    async getUserData(sid: SessionI['sid']): Promise<UserPublic> {
        return new UserPublic({
            session: sid,
        });
    }
}
