import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PropertyGroupService from '@services/PropertyGroup';
import PropertyGroupPrivateController from '@controllers/PropertyGroup/private';
import { PropertyGroupEntity } from '@entities/PropertGroup';

@Module({
    imports: [TypeOrmModule.forFeature([PropertyGroupEntity])],
    controllers: [PropertyGroupPrivateController],
    providers: [PropertyGroupService],
})
export default class PropertyGroupModule {}
