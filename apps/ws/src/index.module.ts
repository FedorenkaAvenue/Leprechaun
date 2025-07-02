import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import EventModule from './event/event.module';
import ConfigModule from '@core/config/config.module';
import ConfigService from '@core/config/config.service';
import UncaughtExceptionFilter from '@shared/filters/uncaughtException.filter';
import MailModule from '@shared/modules/mail/mail.module';
import LoggerModule from '@shared/modules/logger/logger.module';
import HTTPLogMiddleware from '@shared/middlewares/HTTPLog.middleware';

@Module({
    imports: [
        ConfigModule,
        EventModule,
        LoggerModule,
        MailModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf,
        }),
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: UncaughtExceptionFilter,
        },
    ],
})
export default class AppModule implements NestModule {
    constructor(private readonly configService: ConfigService) { }

    configure(consumer: MiddlewareConsumer) {
        if (this.configService.isDev) {
            consumer.apply(HTTPLogMiddleware).forRoutes('*');
        }

        consumer.apply(cookieParser() as Function)
    }
}
