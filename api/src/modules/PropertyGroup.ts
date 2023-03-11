import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PropertyGroupPrivateController from '@controllers/PropertyGroup/private';
import { PropertyGroupEntity } from '@entities/PropertGroup';
import PropertyGroupPrivateService from '@services/PropertyGroup/private';
import PropertyGroupPublicService from '@services/PropertyGroup/public';

@Module({
    imports: [TypeOrmModule.forFeature([PropertyGroupEntity])],
    controllers: [PropertyGroupPrivateController],
    providers: [PropertyGroupPrivateService, PropertyGroupPublicService],
    exports: [PropertyGroupPublicService],
})
export default class PropertyGroupModule {}
