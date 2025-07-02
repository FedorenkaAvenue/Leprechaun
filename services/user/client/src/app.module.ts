import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserModule from './user/user.module';
import ConfigModule from '@common/config/config.module';
import ConfigService from '@common/config/config.service';

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => configService.getDBConnectionData(),
        }),
    ],
})
export class AppModule { }
