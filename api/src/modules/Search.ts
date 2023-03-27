import { Module } from '@nestjs/common';

import SearchPublicController from '@controllers/Search/public';
import SearchPublicService from '@services/Search/public';
import SEModule from './SE';

@Module({
    imports: [SEModule],
    controllers: [SearchPublicController],
    providers: [SearchPublicService],
})
export default class SearchModule {}
