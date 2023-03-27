import { BadRequestException, Controller, Delete, Get, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { ProductLightCard } from '@dto/Product/constructor';
import HistoryPublicService from '@services/History/public';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import SessionGuard from '@guards/Session';
import configService from '@services/Config';
import Queries from '@decorators/Query';
import { QueriesCommon } from '@dto/Queries/constructor';

const USER_HISTORY_LENGTH = configService.getVal('USER_HISTORY_LENGTH');

@Controller('history')
@ApiTags('History 🧑‍💻')
export default class HistoryPublicController {
    constructor(private readonly historyService: HistoryPublicService) {}

    @Get('product')
    @ApiOperation({ summary: `get user product history (${USER_HISTORY_LENGTH} items max length)` })
    @ApiOkResponse({ type: ProductLightCard, isArray: true })
    private getUserHistory(@Session() { id }, @Queries() queries: QueriesCommon): Promise<ProductLightCard[]> {
        return this.historyService.getHistoryList(id, queries);
    }

    @Delete('product')
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor('history is already empty', BadRequestException))
    @ApiOperation({ summary: 'clear product history' })
    @ApiBadRequestResponse({ description: 'history is already empty' })
    private clearHistory(@Session() { id }): Promise<DeleteResult> {
        return this.historyService.clearHistoryList(id);
    }
}
