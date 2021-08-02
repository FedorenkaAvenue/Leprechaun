import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ProductEntity } from "./index.entity";

@Injectable()
export class ProductService {
    constructor(
		@InjectRepository(ProductEntity)
		private readonly productRepo: Repository<ProductEntity>
	) {}
}
