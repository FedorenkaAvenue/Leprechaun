import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertyController } from '@controllers/Property';
import { PropertyEntity } from '@entities/Property';
import { PropertyService } from '@services/Property';

@Module({
	imports: [
		TypeOrmModule.forFeature([ PropertyEntity ])
	],
	controllers: [ PropertyController ],
	providers: [ PropertyService ],
})
export class PropertyModule {}
