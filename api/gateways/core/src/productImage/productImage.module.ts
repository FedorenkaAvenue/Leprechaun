import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import ProductImageEntity from "./productImage.entity";
import ProductImageService from "./productImage.service";
import FSModule from "../FS/FS.module";

@Module({
    imports: [TypeOrmModule.forFeature([ProductImageEntity]), FSModule],
    providers: [ProductImageService],
    exports: [ProductImageService],
})
export default class ProductImageModule { }
