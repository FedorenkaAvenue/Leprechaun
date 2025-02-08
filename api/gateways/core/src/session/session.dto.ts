import { ApiProperty } from '@nestjs/swagger';

import { SessionDataI } from './session.interface';

export default class SessionData implements SessionDataI {
    @ApiProperty()
    ip: string | undefined;

    constructor({ ip }: SessionDataI) {
        this.ip = ip;
    }
}
