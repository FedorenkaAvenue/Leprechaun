import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageEntity } from '@entities/Image';
import { ImageService } from '@services/Image';

@Module({
	imports: [
		TypeOrmModule.forFeature([ ImageEntity ])
	],
	providers: [ ImageService ],
	exports: [ ImageService ]
})
export class ImageModule {}
