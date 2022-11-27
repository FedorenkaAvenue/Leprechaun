import { Injectable } from '@nestjs/common';

import { CommonDashboards, UserDashboards } from '@dto/Dashboard/constructor';
import { SessionI } from '@interfaces/Session';
import DashboardService from '.';

@Injectable()
export default class DashboardPublicService extends DashboardService {
    async getCommonDashboards(): Promise<CommonDashboards> {
        const [popular, newest] = await Promise.all([
            await this.productService.getProductListByCriteria({ rating: 'DESC' }, this.dashboardPortion),
            await this.productService.getProductListByCriteria({ created_at: 'DESC' }, this.dashboardPortion),
        ]);

        return new CommonDashboards({ popular, newest });
    }

    async getUserDashboards(sid: SessionI['sid']): Promise<UserDashboards> {
        const [history] = await Promise.all([await this.historyService.getHistoryListBySID(sid)]);

        return new UserDashboards({ history });
    }
}
