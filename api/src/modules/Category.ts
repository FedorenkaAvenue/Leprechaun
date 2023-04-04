import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import CategoryPublicController from '@controllers/Category/public';
import CategoryPrivateController from '@controllers/Category/private';
import { CategoryEntity } from '@entities/Category';
import CategoryPublicService from '@services/Category/public';
import { FSService } from '@services/FS';
import CategoryPrivateService from '@services/Category/private';
import SEModule from './SE';
import CategoryService from '@services/Category';

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryEntity]),
        MulterModule.registerAsync({ useClass: FSService }),
        SEModule,
    ],
    controllers: [CategoryPublicController, CategoryPrivateController],
    providers: [CategoryService, CategoryPublicService, CategoryPrivateService],
    exports: [CategoryService],
})
export default class CategoryModule {}
