import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import CategoryModule from './category/category.module';
import AuthModule from './auth/auth.module';
import ProductModule from './product/product.module';
import OrderModule from './order/order.module';
import EmployerModule from './employer/employer.module';
import PropertyGroupModule from './propertyGroup/propertyGroup.module';
import PropertyModule from './property/property.module';
import ToolsModule from './tools/tools.module';
import ConfigModule from '@core/config/config.module';
import ConfigService from '@core/config/config.service';
import HTTPLogMiddleware from '@shared/middlewares/HTTPLog.middleware';
import LoggerModule from '@shared/modules/logger/logger.module';
import UncaughtExceptionFilter from '@shared/filters/uncaughtException.filter';
import MailModule from '@shared/modules/mail/mail.module';

@Module({
    imports: [
        ConfigModule,
        LoggerModule,
        MailModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf.getDBConnectionData(),
            name: 'default',
        }),
        AuthModule,
        ProductModule,
        CategoryModule,
        PropertyGroupModule,
        PropertyModule,
        EmployerModule,
        OrderModule,
        ToolsModule,
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
