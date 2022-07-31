import { Injectable, NotFoundException } from '@nestjs/common';

import { ICookies } from '@interfaces/Cookies';
import { ISearchReqQueries } from '@interfaces/Queries';
import { PaginationResultDTO } from '@dto/Pagination';
import { CommonDashboardsDTO, UserDashboardsDTO } from '@dto/Dashboard';
import { IProduct, IProductPreview, IPublicProduct } from '@interfaces/Product';
import { IUserDashboards } from '@interfaces/Dashboard';
import { ProductPreview, ProductPublic } from '@dto/Product/constructor';
import { CommonDashboards, UserDashboards } from '@dto/Dashboard/constructor';
import ProductAdminService from './admin';

export const PRODUCT_RELATIONS = ['category', 'properties', 'properties.property_group'];
export const PRODUCT_DEEP_RELATIONS = ['product','product.category', 'product.properties', 'product.properties.property_group'];

@Injectable()
export class ProductService extends ProductAdminService {
	async getPublicProduct(productId: IProduct['id']): Promise<IPublicProduct> {
		try {
			const res = await this.productRepo.findOneOrFail({
				where: { id: productId, is_public: true },
				relations: PRODUCT_RELATIONS
			});

			return new ProductPublic(res);
		} catch(err) {
            console.log(err);
            
			throw new NotFoundException('product not found');
		}
	}

	async getProductPreview(productId: IProduct['id']): Promise<IProductPreview> {
		try {
			const res = await this.productRepo.findOneOrFail({
				where: { id: productId, is_public: true }
			});

			return new ProductPreview(res);
		} catch(err) {
			throw new NotFoundException('product not found');
		}
	}

	async getProductPreviewList(productIds: Array<IProduct['id']>): Promise<IProductPreview[]> {
		const res = await this.productRepo
			.createQueryBuilder('product')
			.leftJoinAndSelect('product.images', 'images')
			.where('product.id IN (:...productIds)', { productIds })
			.andWhere('product.is_public = true')
			.getMany();

		return res.map(prod => new ProductPreview(prod));
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

		return new CommonDashboards({ popular, newest });
	}

	async getUserDashboards({ history }: IUserDashboards<string[]>): Promise<UserDashboardsDTO> {
		return new UserDashboards({
			history: history.length ? await this.getProductPreviewList(history) : []
		});
	}

	async getPublicProducts(
		queries: ISearchReqQueries,
		params: ICookies
	): Promise<PaginationResultDTO<IPublicProduct>> {
		const qb = this.getProductQueryBulder();

		qb
			.leftJoinAndSelect('product.category', 'category')
			.where('product.is_public = true');

		return this.renderResult<IPublicProduct>(qb, queries, params, ProductPublic);
	}

	async getCategoryPublicProducts(
		categoryUrl: string,
		queries: ISearchReqQueries,
		params: ICookies
	): Promise<PaginationResultDTO<IPublicProduct>> {
		const qb = this.getProductQueryBulder();

		qb
			.innerJoin('product.category', 'category')
			.where('category.url = :categoryUrl', { categoryUrl })
			.andWhere('product.is_public = true');

		return this.renderResult<IPublicProduct>(qb, queries, params, ProductPublic);
	}
}
