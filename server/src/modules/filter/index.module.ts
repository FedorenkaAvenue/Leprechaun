import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilterController } from './index.controller';
import { FilterEntity, FilterGroupEntity } from './index.entity';
import { FilterService } from './index.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ FilterGroupEntity, FilterEntity ])
	],
	controllers: [ FilterController ],
	providers: [ FilterService ],
})
export class FilterModule {}
