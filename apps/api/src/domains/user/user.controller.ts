import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

import { UserRoleGuard } from "@domains/user/user.guard";
import { UserRoleDecorator } from "@domains/user/user.decorator";
import { UserDataDTO } from '@domains/user/user.dto';
import { UserRole } from "@gen/user";
import { AuthJWTAccessGuard } from "@guards/auth.guard";
import UserService from "./user.service";

@Controller('user')
@UseGuards(AuthJWTAccessGuard)
@ApiTags('User')
export default class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('employer')
    @UserRoleDecorator(UserRole.SUPPORT)
    @UseGuards(UserRoleGuard)
    @ApiOperation({ summary: 'get employer own data' })
    @ApiOkResponse({ type: UserDataDTO })
    @ApiNotFoundResponse({ description: 'user not found' })
    private async getUserData(@Req() req: Request): Promise<UserDataDTO> {
        return this.userService.getUser(req.user.id);
    }

    @Get('employer/list')
    @UserRoleDecorator(UserRole.SUPPORT)
    @UseGuards(UserRoleGuard)
    @ApiOperation({ summary: 'get employers list' })
    @ApiOkResponse({ type: UserDataDTO, isArray: true })
    private async getEmployerList(): Promise<UserDataDTO[]> {
        return this.userService.getEmployerList();
    }
}
