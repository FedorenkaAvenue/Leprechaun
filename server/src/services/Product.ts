import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';

import { CreateProductDTO, CreateProductDTOConstructor } from '@dto/Product';
import { ProductEntity } from '@entities/Product';
import { FOLDER_TYPES, MulterService } from '@services/Multer';
import { ImageService } from '@services/Image';
import { CookieSortType, ICookies } from '@interfaces/Cookies';
import { ISearchReqQueries } from '@interfaces/Queries';
import { SearchResultDTO } from '@dto/SearchResult';
import { SearchQueriesDTO } from '@dto/SearchQueries';
import { CookieDTO } from '@dto/Cookies';
import SphinxService from '@services/Sphinx';

@Injectable()
export class ProductService {
    constructor(
		@InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
		private readonly multerModule: MulterService,
		private readonly imageService: ImageService,
		private readonly sphinxService: SphinxService
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
		const qb = this.productRepo
			.createQueryBuilder('product')
			// .innerJoin('product.properties', 'temp_props')
			.leftJoinAndSelect('product.properties', 'properties')
			.leftJoinAndSelect('properties.property_group', 'property_group')
			.leftJoinAndSelect('product.images', 'images');

		return this.renderResult(qb, queries, cookies);
	}

	async getCategoryProducts(
		categoryUrl: string,
		queries: ISearchReqQueries,
		cookies: ICookies
	): Promise<SearchResultDTO> {
		const qb = this.productRepo
			.createQueryBuilder('product')
			// .innerJoin('product.properties', 'temp_props')
			.leftJoinAndSelect('product.properties', 'properties')
			.leftJoinAndSelect('properties.property_group', 'property_group')
			.leftJoinAndSelect('product.images', 'images')
			.where('product.category = :categoryUrl', { categoryUrl });

		return this.renderResult(qb, queries, cookies);
	}

	async searchByString(searchExp: string) {
		const res = await this.sphinxService.searchByQuery(searchExp);

		console.log(res);
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

	/**
	 * @description render product search result with filters, sorting and pagination
	 * @param qb current query builder to continue building query
	 * @param queries
	 * @param cookies
	 * @returns completed search result with pagination
	 */
	async renderResult(
        qb: SelectQueryBuilder<ProductEntity>,
        queries: ISearchReqQueries,
        cookies: ICookies
    ): Promise<SearchResultDTO> {
        const { page, price, sell, restQueries } = new SearchQueriesDTO(queries);
		const { portion, sort } = new CookieDTO(cookies);

		// filtering by dinamical filters
        if (restQueries) {
			for (let propGroup in restQueries) {
				console.log(propGroup, restQueries[propGroup]);
			}
		}

		if (price) qb.andWhere('product.price BETWEEN :from AND :to', { ...price }); // filtering by price

		if (typeof sell === 'number') qb.andWhere('product.is_available = :sell', { sell }); // filtering by sell status
		
		// sorting
		switch (sort) {
			case CookieSortType.PRICE_UP: {
				qb.orderBy('product.price', 'ASC');
				break;
			}

			case CookieSortType.PRICE_DOWN: {
				qb.orderBy('product.price', 'DESC');
				break;
			}

			case CookieSortType.NEW: {
				qb.orderBy('product.created_at', 'DESC');
				break;
			}

			default: // CookieSortType.POPULAR (cookie === 1)
				qb.orderBy('product.rating', 'DESC');
		}

		const [ result, resCount ] = await qb
			.take(portion)
			.skip((page - 1) * portion)
			.getManyAndCount();

		return new SearchResultDTO(
			result.map(({ properties, ...product }) => ({
				...product,
				properties: properties.map(({ property_group, ...prop }) => ({
					prop: property_group,
					val: prop
				}))
			})),
			{
				currentPage: page,
				totalCount: resCount,
				itemPortion: portion
			}
		);
    }
}
