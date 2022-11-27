import { Module } from '@nestjs/common';
import { ScheduleModule as ScheduleModuleRoot } from '@nestjs/schedule';

import SchedulerService from '@services/Scheduler';
import ProductModule from './Product';
import SessionModule from './Session';

@Module({
    imports: [ScheduleModuleRoot.forRoot(), SessionModule, ProductModule],
    providers: [SchedulerService],
})
export default class ScheduleModule {}
