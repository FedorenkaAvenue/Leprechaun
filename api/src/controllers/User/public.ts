import { Controller, Delete, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import UserService from '@services/User';
import { SessionI } from '@interfaces/Session';
import { ProductPreviewI } from '@interfaces/Product';
import { Session } from '@decorators/Session';
import { ProductPreview } from '@dto/Product/constructor';
import { UserPublic } from '@dto/User/constructor';

@Controller('user')
@ApiTags('User 🧑‍💻')
export default class UserPublicController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'get user initial data' })
    @ApiOkResponse({ type: UserPublic })
    getUserData(@Session() session: SessionI): Promise<UserPublic> {
        return this.userService.getUserData(session);
    }

    @Get('history')
    @ApiOperation({ summary: 'get user history' })
    @ApiOkResponse({ type: ProductPreview, isArray: true })
    getUserHistory(@Session() { history }: SessionI): Promise<ProductPreviewI[]> | [] {
        if (!history.length) return [];

        return this.userService.getHistory(history);
    }

    @Delete('history')
    @ApiOperation({ summary: 'clear history' })
    clearHistory(@Session() session: SessionI) {
        session.history = [];
    }
}
