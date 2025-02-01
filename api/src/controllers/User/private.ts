import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

import { AuthJWTAccessGuard } from "@guards/Auth";
import { UserDataI } from "@interfaces/User";
import { UserDataDTO } from "@dto/User";
import UserPrivateService from "@services/User/private";
import { UserRoleGuard } from "@guards/UserRole";
import { UserRole } from "@enums/User";
import { UserRoleDecorator } from "@decorators/UserRole";

@Controller('adm/user')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@ApiTags('User 🤵🏿‍♂️')
export default class UserPrivateController {
    constructor(private readonly userPrivateService: UserPrivateService) { }

    @Get()
    @UserRoleDecorator(UserRole.SUPPORT)
    @ApiOperation({ summary: 'get user own data' })
    @ApiOkResponse({ type: UserDataDTO })
    @ApiNotFoundResponse({ description: 'user not found' })
    private async getUserData(@Req() req: Request): Promise<UserDataI> {
        return this.userPrivateService.getUser(req.user.id);
    }
}
