import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

import SessionEntity from '@entities/Session';
import LoggerService from '@services/Logger';

@Injectable()
export default class SessionService {
    constructor(
        @InjectRepository(SessionEntity) private readonly sessionRepo: Repository<SessionEntity>,
        private readonly loggerService: LoggerService,
    ) {}

    public async clearUselessSession() {
        const currDate = new Date();

        const { affected } = await this.sessionRepo.delete({ expire: LessThan(currDate) });

        this.loggerService.info(`useless ${affected} session was deleted`);
    }
}
