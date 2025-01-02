import { BadRequestException, Controller, Delete, Get, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import HistoryPublicService from '@services/History/public';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import SessionGuard from '@guards/Session';
import ConfigService from '@services/Config';
import Queries from '@decorators/Query';
import { QueriesCommon } from '@dto/Queries';
import { ProductPreviewPublic } from '@dto/Product/public';

@Controller('history')
@ApiTags('History 🧑‍💻')
export default class HistoryPublicController {
    private readonly historyLength: string;

    constructor(
        private readonly historyService: HistoryPublicService,
        private readonly configService: ConfigService,
    ) {
        this.historyLength = configService.getVal('USER_HISTORY_LENGTH') as string;
    }

    @Get('product')
    @ApiOperation({
        summary: `get user product history (${(this as HistoryPublicController).historyLength} items max length)`,
    })
    @ApiCookieAuth()
    @ApiOkResponse({ type: ProductPreviewPublic, isArray: true })
    private getUserHistory(@Session() { id }, @Queries() queries: QueriesCommon): Promise<ProductPreviewPublic[]> {
        return this.historyService.getHistoryList(id, queries);
    }

    @Delete('product')
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor('history is already empty', BadRequestException))
    @ApiOperation({ summary: 'clear product history' })
    @ApiCookieAuth()
    @ApiBadRequestResponse({ description: 'history is already empty' })
    private clearHistory(@Session() { id }): Promise<DeleteResult> {
        return this.historyService.clearHistoryList(id);
    }
}
