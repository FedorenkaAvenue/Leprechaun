import { Module } from '@nestjs/common';

import PropertyGroupService from './propertyGroup.service';
import PropertyGroupController from './propertyGroup.controller';
import PropertyGroupCoreModule from '@core/propertyGroup/propertyGroup.module';
import AuthCoreModule from '@core/auth/auth.module';

@Module({
    imports: [PropertyGroupCoreModule, AuthCoreModule],
    controllers: [PropertyGroupController],
    providers: [PropertyGroupService],
})
export default class PropertyGroupModule { }
