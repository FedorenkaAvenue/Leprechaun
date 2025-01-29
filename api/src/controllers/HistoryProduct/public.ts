import { BadRequestException, Controller, Delete, Get, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import AffectedResultInterceptor from '@interceptors/AffectedResult';
import AuthSessionGuard from '@guards/Auth';
import Queries from '@decorators/Query';
import { ProductPreviewPublic } from '@dto/Product/public';
import { ProductPreviewPublicI } from '@interfaces/Product';
import { QueriesCommonI } from '@interfaces/Queries';
import HistoryProductPublicService from '@services/HistoryProduct/public';

@Controller('history')
@ApiTags('History 🧑‍💻')
export default class HistoryProductPublicController {
    constructor(
        private readonly historyService: HistoryProductPublicService,
    ) { }

    @Get('product')
    @ApiOperation({ summary: 'get user product history' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: ProductPreviewPublic, isArray: true })
    private getUserHistory(
        @Session() { id }: Record<string, any>,
        @Queries() queries: QueriesCommonI,
    ): Promise<ProductPreviewPublicI[]> {
        return this.historyService.getHistoryList(id, queries);
    }

    @Delete('product')
    @UseGuards(AuthSessionGuard)
    @UseInterceptors(AffectedResultInterceptor('history is already empty', BadRequestException))
    @ApiOperation({ summary: 'clear product history' })
    @ApiCookieAuth()
    @ApiBadRequestResponse({ description: 'history is already empty' })
    private clearHistory(@Session() { id }: Record<string, any>): Promise<DeleteResult> {
        return this.historyService.clearHistoryList(id);
    }
}
