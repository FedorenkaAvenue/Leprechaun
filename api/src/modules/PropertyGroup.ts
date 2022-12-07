import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PropertyGroupPrivateController from '@controllers/PropertyGroup/private';
import { PropertyGroupEntity, PropertyGroupTransEntity } from '@entities/PropertGroup';
import PropertyGroupPrivateService from '@services/PropertyGroup/private';

@Module({
    imports: [TypeOrmModule.forFeature([PropertyGroupEntity, PropertyGroupTransEntity])],
    controllers: [PropertyGroupPrivateController],
    providers: [PropertyGroupPrivateService],
})
export default class PropertyGroupModule {}
