import { Module } from "@nestjs/common";

import CategoryPublicController from "./category.controller";
import CategoryModule from "@common/category/category.module";

@Module({
    imports: [
        CategoryModule,
    ],
    controllers: [CategoryPublicController],
})
export default class CategoryPublicModule { }
