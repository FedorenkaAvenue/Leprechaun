import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import SessionService from '@services/Session';

@Injectable()
export default class SchedulerService {
    constructor(private readonly sessionService: SessionService) {}

    @Cron('0 0 3 * * 1')
    clearUselessSessionData() {
        this.sessionService.clearUselessSession();
    }
}
