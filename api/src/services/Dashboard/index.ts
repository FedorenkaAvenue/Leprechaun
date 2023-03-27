import { Injectable } from '@nestjs/common';

import configService from '@services/Config';
import HistoryService from '@services/History';
import ProductService from '@services/Product';

@Injectable()
export default class DashboardService {
    protected dashboardPortion: number;

    constructor(protected readonly productService: ProductService, protected readonly historyService: HistoryService) {
        this.dashboardPortion = +configService.getVal('DASHBOARD_PORTION');
    }
}
