import { Injectable, InternalServerErrorException } from '@nestjs/common';

import SearchService from '.';
import { SearchAutocomplete } from '@dto/Search/constructor';
import { SearchBodyDTO } from '@dto/Search';

@Injectable()
export default class SearchPublicService extends SearchService {
    async autocomplete({ substring }: SearchBodyDTO): Promise<SearchAutocomplete> {
        try {
            const [products, categories] = await Promise.all([
                this.searchProduct(substring),
                this.searchCategory(substring),
            ]);

            return new SearchAutocomplete({ products, categories });
        } catch (err) {
            throw new InternalServerErrorException(err.response.text);
        }
    }
}
