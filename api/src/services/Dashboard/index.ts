import { Injectable } from '@nestjs/common';
import ConfigService from '@services/Config';

import HistoryService from '@services/History';
import ProductService from '@services/Product';

@Injectable()
export default class DashboardService {
    protected dashboardPortion: number;

    constructor(
        protected readonly productService: ProductService,
        protected readonly historyService: HistoryService,
        private readonly configService: ConfigService,
    ) {
        this.dashboardPortion = +this.configService.getVal('DASHBOARD_PORTION');
    }
}
