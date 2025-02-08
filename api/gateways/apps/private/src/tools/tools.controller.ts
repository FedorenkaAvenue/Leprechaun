import { Controller, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import ToolsService from './tools.service';
import { UserRoleGuard } from '@core/user/user.guard';
import { AuthJWTAccessGuard } from '@core/auth/auth.guard';
import { UserRole } from '@core/user/user.enum';
import { UserRoleDecorator } from '@core/user/user.decorator';

@Controller('tools')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@UserRoleDecorator(UserRole.SUPPORT)
@ApiTags('Tools')
export default class ToolsController {
    constructor(private readonly toolsService: ToolsService) { }

    @Delete('/cache')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'reset DB cache' })
    @ApiOkResponse({ description: 'successfull reset' })
    private async resetCache(): Promise<void> {
        await this.toolsService.clearCache();
    }
}
