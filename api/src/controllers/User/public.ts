import { Controller, Get, Session } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import UserService from '@services/User';
import { UserPublic } from '@dto/User/constructor';

@Controller('user')
@ApiTags('User 🧑‍💻')
export default class UserPublicController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'get user initial data' })
    @ApiOkResponse({ type: UserPublic })
    getUserData(@Session() { id }): Promise<UserPublic> {
        return this.userService.getUserData(id);
    }
}
