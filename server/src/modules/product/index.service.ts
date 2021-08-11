import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

import { CreateProductDTO } from "./index.dto";
import { ProductEntity } from "./index.entity";
import { FOLDER_TYPES, MulterService } from "@services/multer";

@Injectable()
export class ProductService {
    constructor(
		@InjectRepository(ProductEntity)
		private readonly productRepo: Repository<ProductEntity>,
		private readonly multerModule: MulterService
	) {}

	async createProduct(product: CreateProductDTO, images?: Array<Express.Multer.File>): Promise<ProductEntity> {
		try {
			const productItem = await this.productRepo.save(product);
			const uploadedImgArr = await this.multerModule.saveFiles(FOLDER_TYPES.PRODUCT, productItem.id, images);
			const updProductItem = await this.productRepo.save({ ...productItem, images: uploadedImgArr });

			return updProductItem;
		} catch(err) {
			throw new InternalServerErrorException();
		}
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
