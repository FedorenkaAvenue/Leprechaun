import { Module } from '@nestjs/common';

import SearchPublicController from '@controllers/Search/public';
import SearchPublicService from '@services/Search/public';
import SEModule from './SE';
import ProductModule from './Product';
import CategoryModule from './Category';

@Module({
    imports: [SEModule, ProductModule, CategoryModule],
    controllers: [SearchPublicController],
    providers: [SearchPublicService],
})
export default class SearchModule {}
