import { Injectable, NotFoundException } from '@nestjs/common';

import { CookiesI } from '@interfaces/Cookies';
import { SearchReqQueriesI } from '@interfaces/Queries';
import { PaginationResultDTO } from '@dto/Pagination';
import { CommonDashboardsDTO, UserDashboardsDTO } from '@dto/Dashboard';
import { ProductI, ProductPublicI } from '@interfaces/Product';
import { UserDashboardsI } from '@interfaces/Dashboard';
import { ProductPreview, ProductPublic } from '@dto/Product/constructor';
import { CommonDashboards, UserDashboards } from '@dto/Dashboard/constructor';
import ProductAdminService from './admin';
import { PRODUCT_RELATIONS } from '@constants/relations';
import { SessionI } from '@interfaces/Session';

@Injectable()
export default class ProductService extends ProductAdminService {
    async getPublicProduct(productId: ProductI['id']): Promise<ProductPublicI> {
        try {
            const res = await this.productRepo.findOneOrFail({
                where: { id: productId, is_public: true },
                relations: PRODUCT_RELATIONS,
            });

            return new ProductPublic(res);
        } catch (err) {
            throw new NotFoundException('product not found');
        }
    }

    async getCommonDashboards(): Promise<CommonDashboardsDTO> {
        const [popular, newest] = await Promise.all([
            this.productRepo.find({
                where: { is_public: true },
                take: this.dashboardPortion,
                order: { rating: 'DESC' },
            }),
            this.productRepo.find({
                where: { is_public: true },
                take: this.dashboardPortion,
                order: { created_at: 'DESC' },
            }),
        ]);

        return new CommonDashboards({ popular, newest });
    }

    async getUserDashboards(sid: SessionI['sid']): Promise<UserDashboardsDTO> {
        const history = await this.historyService.getHistoryList(sid);

        return new UserDashboards({
            history: history.map(({ product }) => new ProductPreview(product))
        });
    }

    async getPublicProducts(
        queries: SearchReqQueriesI,
        params: CookiesI,
    ): Promise<PaginationResultDTO<ProductPublicI>> {
        const qb = this.getProductQueryBulder();

        qb.leftJoinAndSelect('product.category', 'category').where('product.is_public = true');

        return this.renderResult<ProductPublicI>(qb, queries, params, ProductPublic);
    }

    async getCategoryPublicProducts(
        categoryUrl: string,
        queries: SearchReqQueriesI,
        params: CookiesI,
    ): Promise<PaginationResultDTO<ProductPublicI>> {
        const qb = this.getProductQueryBulder();

        qb.innerJoin('product.category', 'category')
            .where('category.url = :categoryUrl', { categoryUrl })
            .andWhere('product.is_public = true');

        return this.renderResult<ProductPublicI>(qb, queries, params, ProductPublic);
    }
}
