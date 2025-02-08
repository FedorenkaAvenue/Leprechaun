import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

import EmployerService from "./employer.service";
import { UserRoleGuard } from "@core/user/user.guard";
import { AuthJWTAccessGuard } from "@core/auth/auth.guard";
import { UserRole } from "@core/user/user.enum";
import { UserRoleDecorator } from "@core/user/user.decorator";
import { UserDataI } from "@core/user/user.interface";
import { UserDataDTO } from '@core/user/user.dto';

@Controller('employer')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@ApiTags('Employer')
export default class EmployerController {
    constructor(private readonly employerService: EmployerService) { }

    @Get()
    @UserRoleDecorator(UserRole.SUPPORT)
    @ApiOperation({ summary: 'get user own data' })
    @ApiOkResponse({ type: UserDataDTO })
    @ApiNotFoundResponse({ description: 'user not found' })
    private async getUserData(@Req() req: Request): Promise<UserDataI> {
        return this.employerService.getEmployerOwnData(req.user.id);
    }

    @Get('list')
    @UserRoleDecorator(UserRole.SUPPORT)
    @ApiOperation({ summary: 'get employers list' })
    @ApiOkResponse({ type: UserDataDTO, isArray: true })
    private async getEmployerList(): Promise<UserDataDTO[]> {
        return this.employerService.getEmployerList();
    }
}
