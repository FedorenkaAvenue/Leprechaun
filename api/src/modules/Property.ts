import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PropertyPrivateController from '@controllers/Property/private';
import { PropertyEntity } from '@entities/Property';
import PropertyService from '@services/Property';

@Module({
    imports: [TypeOrmModule.forFeature([PropertyEntity])],
    controllers: [PropertyPrivateController],
    providers: [PropertyService],
})
export default class PropertyModule {}
