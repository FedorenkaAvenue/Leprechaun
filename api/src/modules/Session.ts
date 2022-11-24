import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import SessionEntity from '@entities/Session';
import SessionService from '@services/Session';

@Module({
    imports: [TypeOrmModule.forFeature([SessionEntity])],
    providers: [SessionService],
})
export default class SessionModule {}
