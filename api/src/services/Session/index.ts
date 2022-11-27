import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

import SessionEntity from '@entities/Session';

@Injectable()
export default class SessionService {
    constructor(@InjectRepository(SessionEntity) private readonly sessionRepo: Repository<SessionEntity>) {}

    async clearUselessSession() {
        const currDate = new Date();

        const { affected } = await this.sessionRepo.delete({ expire: LessThan(currDate) });

        console.log(`${currDate.toISOString()}: Useless ${affected} session was deleted.`);
    }
}
