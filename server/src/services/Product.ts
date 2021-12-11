import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';

import { CreateProductDTO, CreateProductDTOConstructor, ProductPreviewDTO, PublicProductDTO } from '@dto/Product';
import { ProductEntity } from '@entities/Product';
import { FOLDER_TYPES, FSService } from '@services/FS';
import { ImageService } from '@services/Image';
import { CookieSortType, ICookies } from '@interfaces/Cookies';
import { ISearchReqQueries } from '@interfaces/Queries';
import { SearchQueriesDTO } from '@dto/Queries';
import { PaginationResultDTO } from '@dto/Pagination';
import CookieService from './Cookie';
import { CommonDashboardsDTO, UserDashboardsDTO } from '@dto/Dashboard';
import { IProduct, IProductPreview, IPublicProduct } from '@interfaces/Product';

const DASHBOARD_PORTION = 20;

@Injectable()
export class ProductService {
    constructor(
		@InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
		private readonly multerModule: FSService,
		private readonly imageService: ImageService,
		private readonly cookieService: CookieService
	) {}

	async createProduct(newProduct: CreateProductDTO, images: Array<Express.Multer.File>): Promise<void> {		
		const { id } = await this.productRepo.save(new CreateProductDTOConstructor(newProduct));
		
		if (images) {
			const uploadedImgArr = await this.multerModule.saveFiles(FOLDER_TYPES.PRODUCT, id, images);

			this.imageService.addImageArr(id, uploadedImgArr);
		}
	}

	// async getAdminProduct(productId: string): Promise<IProduct> {
	// 	return this.productRepo.findOne({
	// 		where: { id: productId },
	// 		relations: ['category', 'properties', 'properties.property_group', 'labels']
	// 	});
	// }

	async getPublicProduct(productId: string): Promise<IPublicProduct> {
		const res = await this.productRepo.findOne({
			where: { id: productId },
			relations: ['category', 'properties', 'properties.property_group', 'labels']
		});

		return new PublicProductDTO(res);
	}

	async getProductPreview(productId: string): Promise<IProductPreview> {
		const res = await this.productRepo.findOne({ id: productId });

		if (!res) throw new NotFoundException('product not found');

		return new ProductPreviewDTO(res);
	}

	async getProductPreviewList(productIds: Array<string>): Promise<IProductPreview[]> {
		const res = await this.productRepo
			.createQueryBuilder('product')
			.leftJoinAndSelect('product.images', 'images')
			.where('product.id IN (:...productIds)', { productIds })
			.getMany();

		return res.map(prod => new ProductPreviewDTO(prod));
	}

	async getCommonDashboards(): Promise<CommonDashboardsDTO> {
		const [ popular, newest ] = await Promise.all([
			this.productRepo.find({
				take: DASHBOARD_PORTION,
				order: { rating: 'DESC' }
			}),
			this.productRepo.find({
				take: DASHBOARD_PORTION,
				order: { created_at: 'DESC' }
			})
		]);

		return new CommonDashboardsDTO({ popular, newest });
	}

	// //TODO
	// async getUserDashboards(): Promise<UserDashboardsDTO> {
	// 	return new UserDashboardsDTO({ visited: [] });
	// }

	async getPublicProducts(
		queries: ISearchReqQueries,
		cookies: ICookies
	): Promise<PaginationResultDTO<IPublicProduct>> {
		const qb = this.productRepo
			.createQueryBuilder('product')
			.leftJoinAndSelect('product.properties', 'properties')
			.leftJoinAndSelect('product.category', 'category')
			.leftJoinAndSelect('product.labels', 'labels')
			.leftJoinAndSelect('product.images', 'images')
			.leftJoinAndSelect('properties.property_group', 'property_group');

		return this.renderResult(qb, queries, cookies);
	}

	async getCategoryPublicProducts(
		categoryUrl: string,
		queries: ISearchReqQueries,
		cookies: ICookies
	): Promise<PaginationResultDTO<IPublicProduct>> {
		const qb = this.productRepo
			.createQueryBuilder('product')
			.innerJoin('product.category', 'category')
			.leftJoinAndSelect('product.properties', 'properties')
			.leftJoinAndSelect('product.labels', 'labels')
			.leftJoinAndSelect('product.images', 'images')
			.leftJoinAndSelect('properties.property_group', 'property_group')
			.where('category.url = :categoryUrl', { categoryUrl });

		return this.renderResult(qb, queries, cookies);
	}

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
    ): Promise<PaginationResultDTO<IPublicProduct>> {
        const { page, price, status, dinamicFilters } = new SearchQueriesDTO(queries);
		const { portion, sort } = this.cookieService.parseRequestCookies(cookies);

		// filtering by dinamical filters
        if (dinamicFilters) {
			const props = Object.keys(dinamicFilters);
			const values = Object.values(dinamicFilters);

			// ? на будущее переделать в subQuery
			qb.andWhere(
				`product.id = ANY(
					SELECT product_id as p_id
					FROM _products_to_properties
					INNER JOIN property AS prop ON prop.id = _products_to_properties.property_id
					INNER JOIN property_group AS prop_gr ON prop.property_group = prop_gr.id
					WHERE property_id IN (:...values)
					AND prop_gr.alt_name IN(:...props)
					GROUP BY p_id
					HAVING COUNT(*) = :filterLen
				)`, {
					props, values,
					filterLen: props.length
				}
			);
		}

		// filtering by price
		if (price) qb.andWhere('product.price BETWEEN :from AND :to', { ...price });

		// filtering by sell status
		if (typeof status) qb.andWhere('product.status = :status', { status });
		
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

			default: // CookieSortType.POPULAR
				qb.orderBy('product.rating', 'DESC');
		}

		const [ result, resCount ] = await qb
			.take(portion)
			.skip((page - 1) * portion)
			.getManyAndCount();
		
		return new PaginationResultDTO<IPublicProduct>(
			result.map(prod => new PublicProductDTO(prod)),
			{
				currentPage: page,
				totalCount: resCount,
				itemPortion: portion
			}
		);
    }
}
