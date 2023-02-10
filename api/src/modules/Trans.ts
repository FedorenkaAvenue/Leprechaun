import { TransEntity } from '@entities/Trans';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([TransEntity])],
})
export default class TransModule {}
