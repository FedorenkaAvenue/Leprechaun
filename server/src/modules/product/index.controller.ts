import { Controller, Injectable } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ProductService } from "./index.service";

@Controller('product')
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
}
