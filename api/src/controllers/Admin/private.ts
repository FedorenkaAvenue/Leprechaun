import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import AdminPrivateService from '@services/Admin/private';

@Controller('adm')
@ApiTags('Admin 🤵🏿‍♂️')
export default class AdminPrivateController {
    constructor(private readonly adminService: AdminPrivateService) {}

    @Get('/cache/reset')
    @ApiOperation({ summary: 'reset DB cache' })
    @ApiOkResponse({ description: 'successfull reset' })
    private async resetCache(): Promise<void> {
        await this.adminService.clearCache();
    }
}
