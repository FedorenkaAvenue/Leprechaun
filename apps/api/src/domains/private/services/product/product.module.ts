import { Module } from "@nestjs/common";

import ProductPrivateController from "./product.controller";
import ProductModule from "@common/product/product.module";

@Module({
    imports: [ProductModule],
    controllers: [ProductPrivateController],
})
export default class ProductPrivateModule { }
