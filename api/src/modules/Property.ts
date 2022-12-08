import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PropertyPrivateController from '@controllers/Property/private';
import { PropertyEntity, PropertyTransEntity } from '@entities/Property';
import PropertyPrivateService from '@services/Property/private';

@Module({
    imports: [TypeOrmModule.forFeature([PropertyEntity, PropertyTransEntity])],
    controllers: [PropertyPrivateController],
    providers: [PropertyPrivateService],
})
export default class PropertyModule {}
