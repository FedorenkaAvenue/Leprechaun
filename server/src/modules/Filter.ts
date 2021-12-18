import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilterService } from '@services/Filter';
import { FilterController } from '@controllers/Filter';
import { CategoryEntity } from '@entities/Category';

@Module({
	imports: [ TypeOrmModule.forFeature([ CategoryEntity ]) ],
    controllers: [ FilterController ],
	providers: [ FilterService ],
	exports: [ FilterService ]
})
export default class FilterModule {}
