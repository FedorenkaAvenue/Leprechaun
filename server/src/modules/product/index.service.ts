import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

import { CreateProductDTO, CreateProductDTOConstructor } from "./index.dto";
import { ProductEntity } from "./index.entity";
import { FOLDER_TYPES, MulterService } from "@services/Multer";
import { ImageService } from "@modules/image/index.service";
import { ICookies } from "@interface/Cookies";
import { ISearchReqQueries } from "@interface/Queries";
import { SearchResultDTO } from "@dto/SearchResult";
import { SearchQueriesDTO } from "@dto/SearchQueries";
import { CookieDTO } from "@dto/Cookies";

@Injectable()
export class ProductService {
    constructor(
		@InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
		private readonly multerModule: MulterService,
		private readonly imageService: ImageService
	) {}

	async createProduct(productDTO: CreateProductDTO, images: Array<Express.Multer.File>): Promise<void> {
		const { id } = await this.productRepo.save(new CreateProductDTOConstructor(productDTO));

		if (images) {
			const uploadedImgArr = await this.multerModule.saveFiles(FOLDER_TYPES.PRODUCT, id, images);

			this.imageService.addImageArr(id, uploadedImgArr);
		}
	}

	async getProduct(productId: string): Promise<ProductEntity> {
		return this.productRepo.findOne({ id: productId });
	}

	async getAllProducts(
		queries: ISearchReqQueries,
		cookies: ICookies
	): Promise<SearchResultDTO> {
		const { page, filters } = new SearchQueriesDTO(queries);
		const { portion, sort } = new CookieDTO(cookies);

		const [ result, count ] = await this.productRepo.findAndCount({
			take: portion,
			skip: (page - 1) * portion,
			relations: ['category']
		});

		return new SearchResultDTO(
			result,
			{
				currentPage: page,
				totalCount: count,
				itemPortion: portion
			}
		);
	}

	async getCategoryProducts(
		categoryUrl: string,
		queries: ISearchReqQueries,
		cookies: ICookies
	): Promise<SearchResultDTO> {
		const { page, filters } = new SearchQueriesDTO(queries);
		const { portion, sort } = new CookieDTO(cookies);

		const [ result, count ] = await this.productRepo.findAndCount({
			where: { category: categoryUrl },
			take: portion,
			skip: (page - 1) * portion
		});

		return new SearchResultDTO(
			result,
			{
				currentPage: page,
				totalCount: count,
				itemPortion: portion
			}
		);
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

	async deleteProduct(productId: string): Promise<DeleteResult> {
		const res = await this.productRepo.delete({ id: productId });
		this.multerModule.removeFolder(FOLDER_TYPES.PRODUCT, productId);

		return res;
	}
}
