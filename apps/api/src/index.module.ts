import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

// import CategoryModule from '@domains/category/category.module';
// import ProductModule from '@domains/product/product.module';
// import OrderModule from '@domains/order/order.module';
// import EmployerModule from '@domains/employer/employer.module';
// import PropertyGroupModule from '@domains/propertyGroup/propertyGroup.module';
// import PropertyModule from '@domains/property/property.module';
// import ToolsModule from '@domains/tools/tools.module';
import AuthModule from '@domains/auth/auth.module';

import ConfigService from '@modules/config/config.service';
import ConfigModule from '@modules/config/config.module';
import HTTPLogMiddleware from '@middlewares/HTTPLog.middleware';
import LoggerModule from '@modules/logger/logger.module';
import UncaughtExceptionFilter from '@filters/UncaughtException.filter';
import MailModule from '@modules/mail/mail.module';

@Module({
    imports: [
        ConfigModule,
        LoggerModule,
        MailModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf,
        }),
        AuthModule,
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
