import { Controller, Delete, Get, Session } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import UserService from '@services/User';
import { ProductPreviewI } from '@interfaces/Product';
import { ProductPreview } from '@dto/Product/constructor';
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

    @Get('history')
    @ApiOperation({ summary: 'get user history' })
    @ApiOkResponse({ type: ProductPreview, isArray: true })
    // TODO
    getUserHistory(@Session() { id }): Promise<ProductPreviewI[]> | [] {
        // if (!productHistory.length) return [];

        return this.userService.getHistory([]);
    }

    @Delete('history')
    @ApiOperation({ summary: 'clear history' })
    clearHistory(@Session() { id }) {
        // TODO
        // session.productHistory = [];
    }
}
