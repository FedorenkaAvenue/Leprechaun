import { Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import SearchPublicService from '@services/Search/public';
import { SearchAutocomplete } from '@dto/Search/constructor';
import Query from '@decorators/Query';
import { QueriesSearch } from '@dto/Queries/constructor';

@Controller('search')
@ApiTags('Search 🧑‍💻')
export default class SearchPublicController {
    constructor(private readonly searchService: SearchPublicService) {}

    @Get('/autocomplete')
    @ApiOperation({ summary: 'search by substring for autocomplete' })
    @ApiOkResponse({ type: SearchAutocomplete })
    @ApiBadRequestResponse({ description: 'substring is empty' })
    @ApiQuery({
        name: 'substring',
        required: true,
        type: 'string',
        description: 'typed string',
    })
    private search(@Query(QueriesSearch) queries: QueriesSearch): Promise<SearchAutocomplete> {
        return this.searchService.autocomplete(queries);
    }
}
