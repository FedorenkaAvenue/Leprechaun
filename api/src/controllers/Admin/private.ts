import { Controller, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import AdminPrivateService from '@services/Admin/private';
import { AuthJWTGuard } from '@guards/Auth';
import { UserRoleDecorator } from '@decorators/UserRole';
import { UserRole } from '@enums/User';
import { UserRoleGuard } from '@guards/UserRole';

@Controller('adm')
@UseGuards(AuthJWTGuard, UserRoleGuard)
@UserRoleDecorator(UserRole.SUPPORT)
@ApiTags('Admin 🤵🏿‍♂️')
export default class AdminPrivateController {
    constructor(private readonly adminService: AdminPrivateService) { }

    @Delete('/cache')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'reset DB cache' })
    @ApiOkResponse({ description: 'successfull reset' })
    private async resetCache(): Promise<void> {
        await this.adminService.clearCache();
    }
}
