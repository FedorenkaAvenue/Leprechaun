import { ApiProperty } from '@nestjs/swagger';

import { SessionI } from '@interfaces/Session';
import { UserPublicI } from '@interfaces/User';

export class UserPublic implements UserPublicI {
    @ApiProperty({ description: 'session id', type: 'string' })
    session: SessionI['sid'];

    constructor({ session }: UserPublicI) {
        this.session = session;
    }
}
