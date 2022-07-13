import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertyAdminController } from '@controllers/Property';
import { PropertyEntity } from '@entities/Property';
import { PropertyService } from '@services/Property';

@Module({
	imports: [
		TypeOrmModule.forFeature([ PropertyEntity ])
	],
	controllers: [ PropertyAdminController ],
	providers: [ PropertyService ],
})
export default class PropertyModule {}
