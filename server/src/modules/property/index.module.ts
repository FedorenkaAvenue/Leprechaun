import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertyController, PropertyGroupController } from './index.controller';
import { PropertyEntity, PropertyGroupEntity } from './index.entity';
import { PropertyGroupService, PropertyService } from './index.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ PropertyGroupEntity, PropertyEntity ])
	],
	controllers: [ PropertyGroupController, PropertyController ],
	providers: [ PropertyGroupService, PropertyService ],
})
export class PropertyModule {}
