import { ApiProperty } from '@nestjs/swagger';

import { UserPublicI } from '@interfaces/User';
import { SessionI } from '@interfaces/Session';

export class UserPublicDTO implements UserPublicI {
    @ApiProperty({ description: 'session id', type: 'string' })
    session: SessionI['sid'];
}
