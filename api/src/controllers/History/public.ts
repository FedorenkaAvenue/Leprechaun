import { BadRequestException, Controller, Delete, Get, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { ProductCard } from '@dto/Product/constructor';
import HistoryPublicService from '@services/History/public';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { SessionGuard } from '@guards/Session';

@Controller('history')
@ApiTags('History 🧑‍💻')
export default class HistoryPublicController {
    constructor(private readonly historyService: HistoryPublicService) {}

    @Get('product')
    @ApiOperation({ summary: 'get user product history' })
    @ApiOkResponse({ type: ProductCard, isArray: true })
    getUserHistory(@Session() { id }): Promise<ProductCard[]> {
        return this.historyService.getHistoryPublicList(id);
    }

    @Delete('product')
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor('history is already empty', BadRequestException))
    @ApiOperation({ summary: 'clear product history' })
    @ApiBadRequestResponse({ description: 'history is already empty' })
    clearHistory(@Session() { id }): Promise<DeleteResult> {
        return this.historyService.clearHistoryPublicList(id);
    }
}
