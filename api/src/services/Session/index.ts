import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import SessionEntity from '@entities/Session';

@Injectable()
export default class SessionService {
    constructor(@InjectRepository(SessionEntity) public readonly sessionRepo: Repository<SessionEntity>) {}

    clearUselessSession() {}
}
