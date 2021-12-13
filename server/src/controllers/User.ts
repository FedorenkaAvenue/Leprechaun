import { Controller, Get, Param, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from '@services/User';
import { UserEntity } from '@entities/User';
import { NotFoundInterceptor } from '@interceptors/responce';
import { IUser } from '@interfaces/User';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get user by id' })
    @ApiOkResponse({ type: UserEntity })
    @ApiNotFoundResponse({ description: 'user not found' })
    getUser(
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<IUser> {
        return this.userService.getUser(id);
    }
}
