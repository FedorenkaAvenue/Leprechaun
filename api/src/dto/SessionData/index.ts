import { ApiProperty } from '@nestjs/swagger';

import { SessionDataI } from '@interfaces/Session';

export default class SessionDataDTO implements SessionDataI {
    @ApiProperty()
    ip: string;
}
