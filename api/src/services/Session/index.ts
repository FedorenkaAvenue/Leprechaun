import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

import SessionEntity from '@entities/Session';
import logger from '@services/Logger';

@Injectable()
export default class SessionService {
    constructor(@InjectRepository(SessionEntity) private readonly sessionRepo: Repository<SessionEntity>) {}

    public async clearUselessSession() {
        const currDate = new Date();

        const { affected } = await this.sessionRepo.delete({ expire: LessThan(currDate) });

        logger.info(`useless ${affected} session was deleted`);
    }
}
