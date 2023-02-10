import { Body, Controller, Get, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import SearchPublicService from '@services/Search/public';
import { SearchAutocomplete } from '@dto/Search/constructor';
import { SearchBodyDTO } from '@dto/Search';

@Controller('search')
@ApiTags('Search 🧑‍💻')
export default class SearchPublicController {
    constructor(private readonly searchService: SearchPublicService) {}

    @Get('/autocomplete')
    @ApiOperation({ summary: 'search by substring for autocomplete' })
    @ApiOkResponse({ type: SearchAutocomplete })
    search(@Body(new ValidationPipe({ transform: true })) body: SearchBodyDTO): Promise<SearchAutocomplete> {
        return this.searchService.autocomplete(body);
    }
}
