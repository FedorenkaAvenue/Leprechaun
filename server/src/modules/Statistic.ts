import { Module } from '@nestjs/common';

import { StatisticController } from '@controllers/Statistic';
import { StatisticService } from '@services/Statistic';

@Module({
	controllers: [ StatisticController ],
	providers: [ StatisticService ]
})
export class StatisticModule {}
