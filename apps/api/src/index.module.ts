import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { MulterModule } from '@nestjs/platform-express';

import ConfigService from '@modules/config/config.service';
import ConfigModule from '@modules/config/config.module';
import LoggerModule from '@modules/logger/logger.module';
import MailModule from '@modules/mail/mail.module';
import JWTModule from '@modules/JWT/JWT.module';
import PublicModule from '@public/public.module';
import PrivateModule from '@private/private.module';
import UncaughtExceptionFilter from '@filters/UncaughtException.filter';
import HTTPLogMiddleware from '@middlewares/HTTPLog.middleware';

@Module({
    imports: [
        ConfigModule,
        LoggerModule,
        JWTModule,
        MailModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf,
        }),
        MulterModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => config.getMulterConfig(),
        }),
        PublicModule,
        PrivateModule,
    ],
    providers: [
        { provide: APP_FILTER, useClass: UncaughtExceptionFilter },
    ],
})
export default class AppModule implements NestModule {
    constructor(private readonly configService: ConfigService) { }

    configure(consumer: MiddlewareConsumer) {
        if (this.configService.isDev) {
            consumer.apply(HTTPLogMiddleware).forRoutes('*');
        }

        consumer.apply(cookieParser() as Function).forRoutes('*');
    }
}
