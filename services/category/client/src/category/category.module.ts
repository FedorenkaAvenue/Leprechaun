import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CategoryEntity from './category.entity';
import CategoryController from './category.controller';
import CategoryService from './category.service';
import S3Module from '@common/s3/s3.module';
import TransModule from '@common/trans/trans.module';
import PropertyGroupModule from '@common/propertyGroup/propertyGroup.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryEntity]),
        S3Module,
        TransModule,
        PropertyGroupModule,
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule { }
