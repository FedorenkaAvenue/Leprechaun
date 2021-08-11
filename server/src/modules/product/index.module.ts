import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './index.controller';
import { ProductEntity } from './index.entity';
import { ProductService } from './index.service';
import { MulterService } from '@services/multer';

@Module({
	imports: [
		TypeOrmModule.forFeature([ProductEntity]),
		MulterModule.registerAsync({ useClass: MulterService })
	],
	controllers: [ ProductController ],
	providers: [ ProductService, MulterService ],
})
export class ProductModule {}
