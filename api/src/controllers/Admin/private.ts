import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import AdminService from '@services/Admin';

@Controller('adm')
@ApiTags('Admin 🤵🏿‍♂️')
export default class AdminPrivateController {
    constructor(private readonly adminService: AdminService) {}

    @Get('/cache/reset')
    @ApiOperation({ summary: 'reset DB cache' })
    @ApiOkResponse({ description: 'successfull reset' })
    resetCache() {
        this.adminService.clearCache();
    }
}
