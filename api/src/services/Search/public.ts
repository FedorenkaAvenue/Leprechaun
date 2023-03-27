import { Injectable, InternalServerErrorException } from '@nestjs/common';

import SearchService from '.';
import { QueriesSearch } from '@dto/Queries/constructor';
import { SEIndexesE } from '@enums/SE';
import { SearchAutocomplete } from '@dto/Search/constructor';
import { SECategoryI, SEProductI } from '@interfaces/SE';

@Injectable()
export default class SearchPublicService extends SearchService {
    public async autocomplete({ substring, lang }: QueriesSearch) {
        try {
            const [ products, categories ] = await Promise.all([
                await this.SEService.textSearch<SEProductI>(substring, SEIndexesE.PRODUCT),
                await this.SEService.textSearch<SECategoryI>(substring, SEIndexesE.CATEGORY),
            ]);

            return new SearchAutocomplete({ products, categories }, lang);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
