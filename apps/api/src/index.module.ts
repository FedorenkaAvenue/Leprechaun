import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import AuthModule from '@domains/auth/auth.module';
import UserModule from '@domains/user/user.module';

import ConfigService from '@modules/config/config.service';
import ConfigModule from '@modules/config/config.module';
import HTTPLogMiddleware from '@middlewares/HTTPLog.middleware';
import LoggerModule from '@modules/logger/logger.module';
import UncaughtExceptionFilter from '@filters/UncaughtException.filter';
import MailModule from '@modules/mail/mail.module';
import JWTModule from '@modules/JWT/JWT.module';

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
        AuthModule,
        UserModule,
        // ProductModule,
        // CategoryModule,
        // PropertyGroupModule,
        // PropertyModule,
        // EmployerModule,
        // OrderModule,
        // ToolsModule,
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
