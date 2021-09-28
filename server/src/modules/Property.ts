import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertyController, PropertyGroupController } from '@controllers/Property';
import { PropertyEntity, PropertyGroupEntity } from '@entities/Property';
import { PropertyGroupService, PropertyService } from '@services/Property';

@Module({
	imports: [
		TypeOrmModule.forFeature([ PropertyGroupEntity, PropertyEntity ])
	],
	controllers: [ PropertyGroupController, PropertyController ],
	providers: [ PropertyGroupService, PropertyService ],
})
export class PropertyModule {}
