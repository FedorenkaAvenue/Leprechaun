import { CacheInterceptor, Controller, Get, Session, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CommonDashboards, UserDashboards } from '@dto/Dashboard/constructor';
import DashboardPublicService from '@services/Dashboard/public';

@Controller('dashboard')
@ApiTags('Dashboard 🧑‍💻')
export default class DashboardPublicController {
    constructor(private readonly dashboardService: DashboardPublicService) {}

    @Get('common')
    @UseInterceptors(CacheInterceptor)
    @ApiOperation({ summary: 'get common dashboards 💾' })
    @ApiOkResponse({ type: CommonDashboards })
    getCommonDashboards(): Promise<CommonDashboards> {
        return this.dashboardService.getCommonDashboards();
    }

    @Get('user')
    @ApiOperation({ summary: 'get individual user dashboards' })
    @ApiOkResponse({ type: UserDashboards })
    getMostPopularProducts(@Session() { id }): Promise<UserDashboards> {
        return this.dashboardService.getUserDashboards(id);
    }
}
