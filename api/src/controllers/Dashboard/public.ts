import { CacheInterceptor, Controller, Get, Session, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CommonDashboards, UserDashboards } from '@dto/Dashboard/constructor';
import DashboardPublicService from '@services/Dashboard/public';
import Queries from '@decorators/Query';
import { QueriesCommon } from '@dto/Queries/constructor';

@Controller('dashboard')
@ApiTags('Dashboard 🧑‍💻')
export default class DashboardPublicController {
    constructor(private readonly dashboardService: DashboardPublicService) {}

    @Get('common')
    @UseInterceptors(CacheInterceptor)
    @ApiOperation({ summary: 'get common dashboards 💾' })
    @ApiOkResponse({ type: CommonDashboards })
    getCommonDashboards(@Queries() queries: QueriesCommon): Promise<CommonDashboards> {
        return this.dashboardService.getCommonDashboards(queries);
    }

    @Get('user')
    @ApiOperation({ summary: 'get individual user dashboards' })
    @ApiOkResponse({ type: UserDashboards })
    getMostPopularProducts(@Session() { id }, @Queries() queries: QueriesCommon): Promise<UserDashboards> {
        return this.dashboardService.getUserDashboards(id, queries);
    }
}
