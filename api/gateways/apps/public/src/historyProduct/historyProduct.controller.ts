import { BadRequestException, Controller, Delete, Get, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import HistoryProductService from './historyProduct.service';
import { ProductPreviewPublic } from '../product/product.dto';
import { ProductPreviewPublicI } from '../product/product.interface';
import { QueriesCommonI } from '@core/queries/queries.interface';
import QueryDecorator from '@core/queries/query.decorator';
import SessionGuard from '@core/session/session.guard';
import AffectedResultInterceptor from '@shared/interceptors/affectedResult.interceptor';

@Controller('history')
@ApiTags('Product history')
export default class HistoryProductController {
    constructor(
        private readonly historyService: HistoryProductService,
    ) { }

    @Get('product')
    @ApiOperation({ summary: 'get user product history' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: ProductPreviewPublic, isArray: true })
    private getUserHistory(
        @Session() { id }: Record<string, any>,
        @QueryDecorator() queries: QueriesCommonI,
    ): Promise<ProductPreviewPublicI[]> {
        return this.historyService.getHistoryList(id, queries);
    }

    @Delete('product')
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor('history is already empty', BadRequestException))
    @ApiOperation({ summary: 'clear product history' })
    @ApiCookieAuth()
    @ApiBadRequestResponse({ description: 'history is already empty' })
    private clearHistory(@Session() { id }: Record<string, any>): Promise<DeleteResult> {
        return this.historyService.clearHistoryList(id);
    }
}
