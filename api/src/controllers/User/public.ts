import { Controller, Get, Session } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import UserPublicService from '@services/User/public';
import { UserPublic } from '@dto/User/constructor';

// @desprecated
@Controller('user')
@ApiTags('User 🧑‍💻')
export default class UserPublicController {
    constructor(private readonly UserPublicService: UserPublicService) { }

    @Get()
    @ApiOperation({ summary: 'get user initial data' })
    @ApiOkResponse({ type: UserPublic })
    private getUserData(@Session() { id }): Promise<UserPublic> {
        return this.UserPublicService.getUserData(id);
    }
}
