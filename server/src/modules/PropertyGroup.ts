import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertyGroupService } from '@services/PropertyGroup';
import { PropertyGroupController } from '@controllers/PropertyGroup';
import { PropertyGroupEntity } from '@entities/PropertGroup';

@Module({
	imports: [
		TypeOrmModule.forFeature([ PropertyGroupEntity ])
	],
	controllers: [ PropertyGroupController ],
	providers: [ PropertyGroupService ],
})
export class PropertyGroupModule {}