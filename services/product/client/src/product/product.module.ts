import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductEntity } from "./product.entity";
import TransModule from "@common/trans/trans.module";
import { ProductController } from "./product.controller";
import ProductService from "./product.service";
import S3Module from "@common/s3/s3.module";
import CategoryModule from "@common/category/category.module";
import PropertyGroupModule from "@common/propertyGroup/propertyGroup.module";
import EventModule from "@common/event/event.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductEntity]),
        TransModule,
        S3Module,
        CategoryModule,
        PropertyGroupModule,
        EventModule,
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export default class ProductModule { }
