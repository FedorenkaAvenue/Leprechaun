import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import ProductService from '@services/Product';
import SessionService from '@services/Session';

@Injectable()
export default class SchedulerService {
    constructor(private readonly sessionService: SessionService, private readonly productService: ProductService) {}

    @Cron(CronExpression.EVERY_DAY_AT_3AM)
    private dayly(): void {
        this.sessionService.clearUselessSession();
    }

    @Cron('0 0 3 * 1')
    private weekly(): void {
        this.productService.changeNewStatus();
    }
}
