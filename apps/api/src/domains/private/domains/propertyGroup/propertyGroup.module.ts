import { Module } from '@nestjs/common';

import PropertyGroupPrivateController from './propertyGroup.controller';
import PropertyGroupModule from '@common/propertyGroup/propertyGroup.module';

@Module({
    imports: [PropertyGroupModule],
    controllers: [PropertyGroupPrivateController],
})
export default class PropertyGroupPrivateModule { }
