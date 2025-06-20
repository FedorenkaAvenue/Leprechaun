import { Module } from '@nestjs/common';

import PropertyPrivateController from './property.controller';
import PropertyPrivateService from './property.service';
import PropertyGroupPrivateModule from '../propertyGroup/propertyGroup.module';

@Module({
    imports: [PropertyGroupPrivateModule],
    controllers: [PropertyPrivateController], // to use gRPC client module
    providers: [PropertyPrivateService],
})
export default class PropertyPrivateModule { }
