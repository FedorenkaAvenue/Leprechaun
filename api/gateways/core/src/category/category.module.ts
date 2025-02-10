import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import CategoryEntity from "./category.entity";
import PropertyGroupModule from "../propertyGroup/propertyGroup.module";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity]), PropertyGroupModule],
    exports: [TypeOrmModule],
})
export default class CategoryModule { }
