import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import AdminService from '@services/Admin';

@ApiTags('Admin (admin)')
@Controller('adm')
export default class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) {}

    @Get('/cache/reset')
    @ApiOperation({ summary: 'reset DB cache' })
    @ApiOkResponse({ description: 'successfull reset' })
    resetCache() {
        this.adminService.clearCache();
    }
}
