import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PropertyPrivateController from '@controllers/Property/private';
import { PropertyEntity } from '@entities/Property';
import PropertyPrivateService from '@services/Property/private';

@Module({
    imports: [TypeOrmModule.forFeature([PropertyEntity])],
    controllers: [PropertyPrivateController],
    providers: [PropertyPrivateService],
})
export default class PropertyModule {}
