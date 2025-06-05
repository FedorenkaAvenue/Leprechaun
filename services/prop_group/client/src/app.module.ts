import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PropertyGroupModule from './propertyGroup/propertyGroup.module';
import PropertyModule from './property/property.module';
import ConfigModule from './config/config.module';
import ConfigService from './config/config.service';

@Module({
    imports: [
        PropertyGroupModule,
        PropertyModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf.getDBConnectionData(),
            name: 'default',
        }),
    ],
})
export class AppModule { }
