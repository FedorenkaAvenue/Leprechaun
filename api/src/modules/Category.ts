import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import CategoryPublicController from '@controllers/Category/public';
import CategoryAdminController from '@controllers/Category/admin';
import { CategoryEntity } from '@entities/Category';
import { CategoryService } from '@services/Category';
import { FSService } from '@services/FS';

@Module({
	imports: [
		TypeOrmModule.forFeature([CategoryEntity]),
		MulterModule.registerAsync({ useClass: FSService })
	],
	controllers: [ CategoryPublicController, CategoryAdminController ],
	providers: [ CategoryService, FSService ],
})
export default class CategoryModule {}
