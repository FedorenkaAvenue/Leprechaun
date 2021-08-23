import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageEntity } from './index.entity';
import { ImageService } from './index.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ ImageEntity ])
	],
	providers: [ ImageService ],
	exports: [ ImageService ]
})
export class ImageModule {}
