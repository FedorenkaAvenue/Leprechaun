import { Injectable } from '@nestjs/common';

import { CommonDashboards, UserDashboards } from '@dto/Dashboard/constructor';
import { SessionI } from '@interfaces/Session';
import DashboardService from '.';

@Injectable()
export default class DashboardPublicService extends DashboardService {
    async getCommonDashboards(): Promise<CommonDashboards> {
        const [popular, newest] = await Promise.all([
            this.productService.getProductListByCriteria({ rating: 'DESC' }, this.dashboardPortion),
            this.productService.getProductListByCriteria({ created_at: 'DESC' }, this.dashboardPortion),
        ]);

        return new CommonDashboards({ popular, newest });
    }

    async getUserDashboards(sid: SessionI['sid']): Promise<UserDashboards> {
        const [history] = await Promise.all([this.historyService.getHistoryListBySID(sid)]);

        return new UserDashboards({ history });
    }
}
