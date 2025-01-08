import { ApiProperty } from '@nestjs/swagger';

import { SessionDataI } from '@interfaces/Session';

export default class SessionData implements SessionDataI {
    @ApiProperty()
    ip: string;

    constructor({ ip }: SessionDataI) {
        this.ip = ip;
    }
}
