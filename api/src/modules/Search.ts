import { Module } from '@nestjs/common';

import SearchPublicController from '@controllers/Search/public';
import SearchPublicService from '@services/Search/public';

@Module({
    controllers: [SearchPublicController],
    providers: [SearchPublicService],
})
export default class SEModule {}
