import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import SessionEntity from '@entities/Session';

@Module({
    imports: [TypeOrmModule.forFeature([SessionEntity])],
    controllers: [],
    providers: [],
})
export default class SessionModule {}
