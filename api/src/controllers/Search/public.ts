import { SearchItem } from '@dto/Search/constructor';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import SearchService from '@services/Search';

@Controller('search')
@ApiTags('Search 🧑‍💻')
export default class SearchPublicController {
    constructor(private readonly searchService: SearchService) {}

    @Get('/autocomplete/:substring')
    @ApiOperation({ summary: 'search by string for autocomplete' })
    @ApiOkResponse({ type: SearchItem, isArray: true })
    search(@Param('substring') substring: string): Promise<SearchItem[]> {
        return this.searchService.autocomplete(substring);
    }
}
