import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

import { CreateProductDTO, UpdateProductDTO } from "./index.dto";
import { ProductEntity } from "./index.entity";
import { FOLDER_TYPES, MulterService } from "@services/Multer";

@Injectable()
export class ProductService {
    constructor(
		@InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
		private readonly multerModule: MulterService
	) {}

	async createProduct(product: CreateProductDTO, images?: Array<Express.Multer.File>): Promise<ProductEntity> {
		const productItem = await this.productRepo.save(product);
		const uploadedImgArr = await this.multerModule.saveFiles(FOLDER_TYPES.PRODUCT, productItem.id, images);
		const updProductItem = await this.productRepo.save({ ...productItem, images: uploadedImgArr });

		return updProductItem;
	}

	getProduct(productId: string): Promise<ProductEntity> {
		return this.productRepo.findOne({
			where: { id: productId },
			relations: ['category']
		})
	}

	//TODO: обновление фоток
	async updateProduct(product: UpdateProductDTO): Promise<UpdateResult> {
		return this.productRepo.update(
			{ id: product.id },
			product
		);
		// const uploadedImgArr = await this.multerModule.saveFiles(FOLDER_TYPES.PRODUCT, productItem.id, images);
		// const updProductItem = await this.productRepo.save({ ...productItem, images: uploadedImgArr });
	}

	async deleteProduct(productId: string): Promise<DeleteResult> {
		const res = await this.productRepo.delete({ id: productId });
		this.multerModule.removeFolder(FOLDER_TYPES.PRODUCT, productId);

		return res;
	}
}
