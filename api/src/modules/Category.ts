import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import CategoryPublicController from '@controllers/Category/public';
import CategoryPrivateController from '@controllers/Category/private';
import { CategoryEntity } from '@entities/Category';
import CategoryPublicService from '@services/Category/public';
import { FSService } from '@services/FS';
import CategoryPrivateService from '@services/Category/private';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity]), MulterModule.registerAsync({ useClass: FSService })],
    controllers: [CategoryPublicController, CategoryPrivateController],
    providers: [CategoryPublicService, CategoryPrivateService, FSService],
})
export default class CategoryModule {}
