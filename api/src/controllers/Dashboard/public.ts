import { Controller, Get, Session, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

import { CommonDashboards, UserDashboards } from '@dto/Dashboard/constructor';
import DashboardPublicService from '@services/Dashboard/public';
import Queries from '@decorators/Query';
import { QueriesCommon } from '@dto/Queries';

@Controller('dashboard')
@ApiTags('Dashboard 🧑‍💻')
export default class DashboardPublicController {
    constructor(private readonly dashboardService: DashboardPublicService) { }

    @Get('common')
    @UseInterceptors(CacheInterceptor)
    @ApiOperation({ summary: 'get common dashboards 💾' })
    @ApiOkResponse({ type: CommonDashboards })
    private getCommonDashboards(@Queries() queries: QueriesCommon): Promise<CommonDashboards> {
        return this.dashboardService.getCommonDashboards(queries);
    }

    @Get('user')
    @ApiOperation({ summary: 'get individual user dashboards' })
    @ApiOkResponse({ type: UserDashboards })
    private getMostPopularProducts(@Session() { id }, @Queries() queries: QueriesCommon): Promise<UserDashboards> {
        return this.dashboardService.getUserDashboards(id, queries);
    }
}
