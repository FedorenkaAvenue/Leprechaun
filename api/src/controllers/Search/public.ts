import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import SearchService from '@services/Search';

@Controller('search')
@ApiTags('Search 🧑‍💻')
export default class SearchPublicController {
    constructor(private readonly searchService: SearchService) {}

    @Get('')
    search() {
        this.searchService.test();
    }
}
