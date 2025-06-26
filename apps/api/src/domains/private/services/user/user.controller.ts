import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

import { User, UserRole } from "@gen/user";
import { AuthJWTAccessGuard } from "@guards/auth.guard";
import UserService from "@common/user/user.service";
import { UserRoleDecorator } from "@common/user/user.decorator";
import { UserRoleGuard } from "@common/user/user.guard";
import { UserSchema } from "./user.schema";

@Controller('user')
@UseGuards(AuthJWTAccessGuard)
@ApiTags('User 👨🏿‍💼')
export default class UserPrivateController {
    constructor(private readonly userService: UserService) { }

    @Get('employer')
    @UserRoleDecorator(UserRole.SUPPORT)
    @UseGuards(UserRoleGuard)
    @ApiOperation({ summary: 'get employer own data' })
    @ApiOkResponse({ type: UserSchema })
    @ApiNotFoundResponse({ description: 'user not found' })
    private async getUserData(@Req() req: Request): Promise<User> {
        return this.userService.getUserPrivate(req.user.id);
    }

    @Get('employer/list')
    @UserRoleDecorator(UserRole.SUPPORT)
    @UseGuards(UserRoleGuard)
    @ApiOperation({ summary: 'get employers list' })
    @ApiOkResponse({ type: UserSchema, isArray: true })
    private async getEmployerList(): Promise<User[]> {
        return this.userService.getEmployerListPrivate();
    }
}
