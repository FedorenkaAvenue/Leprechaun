import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilterController, FilterGroupController } from './index.controller';
import { FilterEntity, FilterGroupEntity } from './index.entity';
import { FilterGroupService, FilterService } from './index.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ FilterGroupEntity, FilterEntity ])
	],
	controllers: [ FilterGroupController, FilterController ],
	providers: [ FilterGroupService, FilterService ],
})
export class FilterModule {}
