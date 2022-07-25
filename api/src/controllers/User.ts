import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import UserService from '@services/User';
import { ISession } from '@interfaces/Session';
import { IProductPreview } from '@interfaces/Product';
import { Session } from '@decorators/Session';
import { ProductPreview } from '@dto/Product/constructor';

@Controller('user')
@ApiTags('User 🧑‍💻')
export default class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get('history')
    @ApiOperation({ summary: 'get user history' })
    @ApiOkResponse({ type: ProductPreview, isArray: true })
    getUserHistory(
        @Session() { history }: ISession
    ): Promise<IProductPreview[]> | [] {
        if (!history.length) return [];
        
        return this.userService.getHistory(history);
    }
}
