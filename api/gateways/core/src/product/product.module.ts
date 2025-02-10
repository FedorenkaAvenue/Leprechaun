import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductEntity } from "./product.entity";
import ImageModule from "../image/image.module";
import ProductService from "./product.service";
import LoggerModule from "@shared/modules/logger/logger.module";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity]), ImageModule, LoggerModule],
    providers: [ProductService],
    exports: [ProductService, TypeOrmModule],
})
export default class ProductModule { }
