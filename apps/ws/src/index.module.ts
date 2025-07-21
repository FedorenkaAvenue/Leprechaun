import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { UncaughtExceptionFilter } from '@fedorenkaavenue/leprechaun_lib_utils/filters';
import { MailModule, LoggerModule } from '@fedorenkaavenue/leprechaun_lib_utils/modules';
import { HTTPLogMiddleware } from '@fedorenkaavenue/leprechaun_lib_utils/middlewares';

import ConfigModule from '@common/config/config.module';
import ConfigService from '@common/config/config.service';
import GateModule from './gate/gate.module';

@Module({
    imports: [
        ConfigModule,
        LoggerModule,
        MailModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf,
        }),
        GateModule,
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
