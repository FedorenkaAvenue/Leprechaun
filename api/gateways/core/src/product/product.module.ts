import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductEntity } from "./product.entity";
import ProductImageModule from "../productImage/productImage.module";
import ProductService from "./product.service";
import LoggerModule from "@shared/modules/logger/logger.module";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity]), ProductImageModule, LoggerModule],
    providers: [ProductService],
    exports: [ProductService, TypeOrmModule],
})
export default class ProductModule { }
