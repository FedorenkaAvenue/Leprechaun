import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

import { CreateProductDTO } from "./index.dto";
import { ProductEntity } from "./index.entity";

@Injectable()
export class ProductService {
    constructor(
		@InjectRepository(ProductEntity)
		private readonly productRepo: Repository<ProductEntity>
	) {}

	createProduct(product: CreateProductDTO) {
		return this.productRepo.save(product);
	}

	getProduct(productId: string): Promise<ProductEntity> {
		return this.productRepo.findOne({
			where: {
				id: productId
			},
			relations: ['category']
		})
	}

	deleteProduct(productId: string): Promise<DeleteResult> {
		return this.productRepo.delete({ id: productId });
	}
}
