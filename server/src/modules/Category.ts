import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { CategoryController } from '@controllers/Category';
import { CategoryEntity } from '@entities/Category';
import { CategoryService } from '@services/Category';
import { MulterService } from '@services/Multer';

@Module({
	imports: [
		TypeOrmModule.forFeature([CategoryEntity]),
		MulterModule.registerAsync({ useClass: MulterService })
	],
	controllers: [ CategoryController ],
	providers: [
		CategoryService,
		MulterService
	],
})
export class CategoryModule {}
