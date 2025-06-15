import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import ProductImageEntity from "./productImage.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductImageEntity])],
})
export default class ProductImageModule { }
