import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from '@controllers/Product';
import { ProductEntity } from '@entities/Product';
import { ProductService } from '@services/Product';
import { MulterService } from '@services/Multer';
import { ImageModule } from '@modules/Image';

@Module({
	imports: [
		TypeOrmModule.forFeature([ProductEntity]),
		MulterModule.registerAsync({ useClass: MulterService }),
		ImageModule
	],
	controllers: [ ProductController ],
	providers: [ ProductService, MulterService ]
})
export class ProductModule {}
