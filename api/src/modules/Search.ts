import SearchPublicController from '@controllers/Search/public';
import { Module } from '@nestjs/common';

import SearchService from '@services/Search';

@Module({
    controllers: [SearchPublicController],
    providers: [SearchService],
})
export default class SEModule {}
