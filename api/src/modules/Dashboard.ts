import { Module } from '@nestjs/common';

import HistoryModule from './History';
import ProductModule from './Product';
import DashboardPublicController from '@controllers/Dashboard/public';
import DashboardPublicService from '@services/Dashboard/public';

@Module({
    imports: [ProductModule, HistoryModule],
    controllers: [DashboardPublicController],
    providers: [DashboardPublicService],
})
export default class DashboardModule {}
