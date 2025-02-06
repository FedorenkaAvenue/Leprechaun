import { Module } from '@nestjs/common';

import PropertyController from './property.controller';
import PropertyService from './property.service';
import PropertyCoreModule from '@core/property/property.module';
import AuthModule from '@core/auth/auth.module';

@Module({
    imports: [PropertyCoreModule, AuthModule],
    controllers: [PropertyController],
    providers: [PropertyService],
})
export default class PropertyModule { }
