import { Injectable, NotFoundException } from '@nestjs/common';
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
import { CommonDashboardsDTO, UserDashboardsDTO } from '@dto/Dashboard';
import { IProduct, IProductPreview, IPublicProduct } from '@interfaces/Product';
import { ConfigService } from './Config';
import { IUserDashboards } from '@interfaces/Dashboard';

@Injectable()
export class ProductService {
	dashboardPortion: number;

    constructor(
		@InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
		private readonly FSService: FSService,
		private readonly imageService: ImageService,
		private readonly configService: ConfigService
	) {
		this.dashboardPortion = +this.configService.getVal('DASHBOARD_PORTION');
	}

	async createProduct(newProduct: CreateProductDTO, images: Array<Express.Multer.File>): Promise<void> {
		const { id } = await this.productRepo.save(new CreateProductDTOConstructor(newProduct));
		
		if (images) {
			const uploadedImgArr = await this.FSService.saveFiles(FOLDER_TYPES.PRODUCT, id, images);

			this.imageService.addImageArr(id, uploadedImgArr);
		}
	}

	async getAdminProduct(productId: string): Promise<IProduct> {
		return this.productRepo.findOne({
			where: { id: productId },
			relations: ['category', 'properties', 'properties.property_group', 'labels']
		});
	}

	async getPublicProduct(productId: string): Promise<IPublicProduct> {
		try {
			const res = await this.productRepo.findOneOrFail({
				where: { id: productId, is_public: true },
				relations: ['category', 'properties', 'properties.property_group', 'labels']
			});

			return new PublicProductDTO(res);
		} catch(err) {
			throw new NotFoundException('product not found');
		}
	}

	async getProductPreview(productId: string): Promise<IProductPreview> {
		try {
			const res = await this.productRepo.findOneOrFail({
				where: { id: productId, is_public: true }
			});

			return new ProductPreviewDTO(res);
		} catch(err) {
			throw new NotFoundException('product not found');
		}
	}

	async getProductPreviewList(productIds: Array<string>): Promise<IProductPreview[]> {
		const res = await this.productRepo
			.createQueryBuilder('product')
			.leftJoinAndSelect('product.images', 'images')
			.where('product.id IN (:...productIds)', { productIds })
			.andWhere('product.is_public = true')
			.getMany();

		return res.map(prod => new ProductPreviewDTO(prod));
	}

	async getCommonDashboards(): Promise<CommonDashboardsDTO> {
		const [ popular, newest ] = await Promise.all([
			this.productRepo.find({
				where: { is_public: true },
				take: this.dashboardPortion,
				order: { rating: 'DESC' }
			}),
			this.productRepo.find({
				where: { is_public: true },
				take: this.dashboardPortion,
				order: { created_at: 'DESC' }
			})
		]);

		return new CommonDashboardsDTO({ popular, newest });
	}

	async getUserDashboards({ history }: IUserDashboards<string[]>): Promise<UserDashboardsDTO> {
		return new UserDashboardsDTO({
			history: history.length ? await this.getProductPreviewList(history) : []
		});
	}

	async getPublicProducts(
		queries: ISearchReqQueries,
		params: ICookies
	): Promise<PaginationResultDTO<IPublicProduct>> {
		const qb = this.productRepo
			.createQueryBuilder('product')
			.leftJoinAndSelect('product.properties', 'properties')
			.leftJoinAndSelect('product.category', 'category')
			.leftJoinAndSelect('product.labels', 'labels')
			.leftJoinAndSelect('product.images', 'images')
			.leftJoinAndSelect('properties.property_group', 'property_group')
			.where('product.is_public = true');

		return this.renderResult(qb, queries, params);
	}

	async getCategoryPublicProducts(
		categoryUrl: string,
		queries: ISearchReqQueries,
		params: ICookies
	): Promise<PaginationResultDTO<IPublicProduct>> {
		const qb = this.productRepo
			.createQueryBuilder('product')
			.innerJoin('product.category', 'category')
			.leftJoinAndSelect('product.properties', 'properties')
			.leftJoinAndSelect('product.labels', 'labels')
			.leftJoinAndSelect('product.images', 'images')
			.leftJoinAndSelect('properties.property_group', 'property_group')
			.where('category.url = :categoryUrl', { categoryUrl })
			.andWhere('product.is_public = true');

		return this.renderResult(qb, queries, params);
	}

	async deleteProduct(productId: string): Promise<DeleteResult> {
		const res = await this.productRepo.delete({ id: productId });

		this.FSService.removeFolder(FOLDER_TYPES.PRODUCT, productId);

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
        params: ICookies
    ): Promise<PaginationResultDTO<IPublicProduct>> {
        const { page, price, status, dinamicFilters } = new SearchQueriesDTO(queries);
		const { portion, sort } = params;

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
