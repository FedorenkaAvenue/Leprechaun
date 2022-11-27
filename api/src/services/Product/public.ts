import { Injectable, NotFoundException } from '@nestjs/common';

import { QueriesProductT } from '@interfaces/Queries';
import { PaginationResultDTO } from '@dto/Pagination';
import { ProductI } from '@interfaces/Product';
import { ProductPreview, ProductCard, ProductPublic } from '@dto/Product/constructor';
import { CommonDashboards, UserDashboards } from '@dto/Dashboard/constructor';
// import { PRODUCT_RELATIONS } from '@constants/relations';
import { SessionI } from '@interfaces/Session';
import ProductService from '.';
// import WishlistItemEntity from '@entities/WishlistItem';
import { PRODUCT_RELATIONS } from '@constants/relations';

@Injectable()
export default class ProductPublicService extends ProductService {
    async getProduct(productId: ProductI['id']): Promise<ProductPublic> {
        try {
            const res = await this.productRepo.findOneOrFail({
                where: { id: productId, is_public: true },
                relations: PRODUCT_RELATIONS,
            });

            // const qb = this.getProductQueryBulder();

            // qb.leftJoinAndSelect('product.category', 'category').where('product.is_public = true');
            // qb.addSelect(
            //     qb =>
            //         qb
            //             .select('COUNT(*)', 'product.wishlistCount')
            //             .from(WishlistItemEntity, 'w')
            //             .where('w.product = product.id'),
            //     'wishlistCount',
            // );
            // qb.leftJoinAndMapOne(
            //     'product.wu',
            //     qb => qb
            //         .select('COUNT(*)', 'wishlistuu')
            //         .from(WishlistItemEntity, 'w')
            //         .where('w.product = product.id'),
            //     'wu'
            // );

            // const res = await qb.getOne();

            // console.log(res);

            return new ProductPublic(res);
        } catch (_) {
            throw new NotFoundException('product not found');
        }
    }

    async getCommonDashboards(): Promise<CommonDashboards> {
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

    async getUserDashboards(sid: SessionI['sid']): Promise<UserDashboards> {
        const history = await this.historyService.getHistoryListBySID(sid);

        return new UserDashboards({
            history: history.map(({ product }) => new ProductPreview(product)),
        });
    }

    async getProductList(queries: QueriesProductT): Promise<PaginationResultDTO<ProductCard>> {
        const qb = this.getProductQueryBulder();

        qb.leftJoinAndSelect('product.category', 'category').where('product.is_public = true');

        return this.renderResult<ProductCard>(qb, queries, ProductCard);
    }

    async getCategoryProducts(
        categoryUrl: string,
        queries: QueriesProductT,
    ): Promise<PaginationResultDTO<ProductCard>> {
        const qb = this.getProductQueryBulder();

        qb.innerJoin('product.category', 'category')
            .where('category.url = :categoryUrl', { categoryUrl })
            .andWhere('product.is_public = true');

        return this.renderResult<ProductCard>(qb, queries, ProductCard);
    }
}
