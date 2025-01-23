import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HistoryProductEntity } from '@entities/HistoryProduct';
import HistoryProductPublicService from '@services/HistoryProduct/public';
import HistoryProductService from '@services/HistoryProduct';
import HistoryProductPublicController from '@controllers/HistoryProduct/public';

@Module({
    imports: [TypeOrmModule.forFeature([HistoryProductEntity])],
    controllers: [HistoryProductPublicController],
    providers: [HistoryProductPublicService, HistoryProductService],
    exports: [HistoryProductPublicService, HistoryProductService],
})
export default class HistoryProductModule { }
