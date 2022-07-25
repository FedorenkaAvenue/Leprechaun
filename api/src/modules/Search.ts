import { Module } from '@nestjs/common';

import { SearchController } from '@controllers/Search';
import { SearchService } from '@services/Search';
import ManticoreService from '@services/Manticore';

@Module({
	controllers: [ SearchController ],
	providers: [ SearchService, ManticoreService ]
})
export default class SearchModule {}
