import { Injectable, NotFoundException } from "@nestjs/common";
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

	async createProduct(
		productDTO: CreateProductDTO,
		images: Array<Express.Multer.File>
	): Promise<ProductEntity> {
		const product = await this.productRepo.save(productDTO);
		const uploadedImgArr = await this.multerModule.saveFiles(FOLDER_TYPES.PRODUCT, product.id, images);
		await this.productRepo.update(
			{ id: product.id },
			{ images: uploadedImgArr }
		);

		return ({ ...product, images: uploadedImgArr });
	}

	getProduct(productId: string): Promise<ProductEntity> {
		return this.productRepo.findOne({
			where: { id: productId },
			relations: ['category']
		})
	}

	// async updateProduct(
	// 	productDTO: UpdateProductDTO,
	// 	newImages: Array<Express.Multer.File>
	// ): Promise<UpdateResult> {
	// 	const product = await this.productRepo.findOne({ id: productDTO.id });

	// 	if (!product) throw new NotFoundException();

	// 	const { images: imagesDTO, removedImages, mainImg } = productDTO;
	// 	let { images } = product;

	// 	if (removedImages.length) {
	// 		this.multerModule.removeFiles(removedImages);
	// 		// images = [].
	// 	}

	// 	if (images.length) await this.multerModule.saveFiles(FOLDER_TYPES.PRODUCT, productDTO.id, newImages);
		
	// 	// updImages = [ mainImg, ...prod.images.filter(img => img !== mainImg)];
		
	// 	const res = await this.productRepo.update(
	// 		{ id: product.id },
	// 		{ ...productDTO }
	// 	);

	// 	return res;

	// 	// async removeStatic(productId: string, fileSrc: string): Promise<boolean> {
	// 	// 	const product = await this.productRepo.findOne({ id: productId });
			
	// 	// 	if (!product) throw new NotFoundException(null, 'product not found');
	// 	// 	if (!product.images.includes(fileSrc)) throw new NotFoundException(null, 'file not found');

	// 	// 	const updImageArr = product.images.filter(img => img !== fileSrc);
	// 	// 	this.productRepo.update(
	// 	// 		{ id: productId },
	// 	// 		{ images: updImageArr }
	// 	// 	);
	// 	// 	this.multerModule.removeFile(fileSrc);

	// 	// 	return true;
	// 	// }
	// }

	async deleteProduct(productId: string): Promise<DeleteResult> {
		const res = await this.productRepo.delete({ id: productId });
		this.multerModule.removeFolder(FOLDER_TYPES.PRODUCT, productId);

		return res;
	}
}
