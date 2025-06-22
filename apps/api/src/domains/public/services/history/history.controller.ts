import { Controller, Delete, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import HistoryPublicService from './history.service';
import HistoryPublicSchema from './history.schema';
import QueryDecorator from '@common/queries/query.decorator';
import { QueryCommonParams } from '@gen/common';
import { HistoryPublic } from '@gen/history';

@Controller('history')
@ApiTags('Product history 🧑‍💻')
export default class HistoryPublicController {
    constructor(private readonly historyService: HistoryPublicService) { }

    @Get()
    @ApiOperation({ summary: 'get user product history' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: HistoryPublicSchema, isArray: true })
    private getUserHistory(
        // @Session() { id }: Record<string, any>,
        @QueryDecorator() queries: QueryCommonParams,
    ): Promise<HistoryPublic[]> {
        return this.historyService.getHistoryList('asdasd', queries);
    }

    // @Delete()
    // @UseGuards(SessionGuard)
    // @UseInterceptors(AffectedResultInterceptor('history is already empty', BadRequestException))
    // @ApiOperation({ summary: 'clear product history' })
    // @ApiCookieAuth()
    // @ApiBadRequestResponse({ description: 'history is already empty' })
    // private clearHistory(@Session() { id }: Record<string, any>): Promise<DeleteResult> {
    //     return this.historyService.clearHistoryList(id);
    // }
}
