import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import EventModule from './event/event.module';

import UncaughtExceptionFilter from '@shared/filters/uncaughtException.filter';

@Module({
    imports: [EventModule],
    providers: [
        {
            provide: APP_FILTER,
            useClass: UncaughtExceptionFilter,
        },
    ],
})
export default class AppModule { }
