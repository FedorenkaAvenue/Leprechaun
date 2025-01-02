import { Injectable } from '@nestjs/common';

import { CommonDashboards, UserDashboards } from '@dto/Dashboard/constructor';
import { SessionI } from '@interfaces/Session';
import DashboardService from '.';
import { QueriesCommon } from '@dto/Queries';

@Injectable()
export default class DashboardPublicService extends DashboardService {
    public async getCommonDashboards({ lang }: QueriesCommon): Promise<CommonDashboards> {
        const [popular, newest] = await Promise.all([
            this.productService.getProductListByCriteria({
                where: { is_public: true },
                take: this.dashboardPortion,
                order: { rating: 'DESC' },
            }),
            this.productService.getProductListByCriteria({
                where: { is_public: true },
                take: this.dashboardPortion,
                order: { created_at: 'DESC' },
            })
        ]);

        return new CommonDashboards({ popular, newest }, lang);
    }

    public async getUserDashboards(sid: SessionI['sid'], { lang }: QueriesCommon): Promise<UserDashboards> {
        const [history] = await Promise.all([this.historyService.getHistoryListBySID(sid)]);

        return new UserDashboards({ history }, lang);
    }
}
