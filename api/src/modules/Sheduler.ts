import { Module } from '@nestjs/common';
import { ScheduleModule as ScheduleModuleRoot } from '@nestjs/schedule';

import SchedulerService from '@services/Scheduler';
import OrderModule from './Order';
import WishlistModule from './Wishlist';

@Module({
    imports: [
        ScheduleModuleRoot.forRoot(),
        OrderModule,
        WishlistModule
    ],
    providers: [ SchedulerService ]
})
export default class ScheduleModule {}
