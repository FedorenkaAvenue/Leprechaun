import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HistoryEntity } from '@entities/History';
import HistoryPublicService from '@services/History/public';
import HistoryPublicController from '@controllers/History/public';

@Module({
    imports: [TypeOrmModule.forFeature([HistoryEntity])],
    controllers: [HistoryPublicController],
    providers: [HistoryPublicService],
    exports: [HistoryPublicService],
})
export default class HistoryModule {}
