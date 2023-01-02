import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResultDTO } from '@dto/Pagination';
import { ProductI } from '@interfaces/Product';
import { ProductCard, ProductPublic } from '@dto/Product/constructor';
import ProductService from '.';
import { QueriesProductList } from '@dto/Queries/constructor';
import WishlistItemEntity from '@entities/WishlistItem';
import { CategoryI } from '@interfaces/Category';

@Injectable()
export default class ProductPublicService extends ProductService {
    async getProduct(id: ProductI['id'], searchParams: QueriesProductList): Promise<ProductPublic> {
        const qb = this.getProductQueryBulder();

        qb.leftJoinAndSelect('p.category', 'cat')
            .leftJoinAndSelect('cat.title', 'cat_title')
            .where('p.is_public = true')
            .andWhere('p.id = :id', { id })
            .leftJoinAndMapMany('p.wishlistCount', WishlistItemEntity, 'w', 'w.product.id = p.id');
        try {
            const res = await qb.getOneOrFail();
            const row = await qb.getRawOne();
            console.log(row);
            return new ProductPublic(await qb.getOneOrFail(), searchParams);
        } catch (_) {
            console.log(_);
            throw new NotFoundException('product not found');
        }
    }

    async getProductList(searchParams: QueriesProductList): Promise<PaginationResultDTO<ProductCard>> {
        const qb = this.getProductQueryBulder();

        qb.leftJoinAndSelect('p.cat', 'cat').where('p.is_public = true').andWhere('pg.is_primary = true');

        return this.renderResult<ProductCard>(qb, searchParams, ProductCard);
    }

    async getCategoryProducts(
        categoryUrl: CategoryI['url'],
        queries: QueriesProductList,
    ): Promise<PaginationResultDTO<ProductCard>> {
        const qb = this.getProductQueryBulder();

        qb.innerJoin('p.category', 'cat')
            .where('cat.url = :categoryUrl', { categoryUrl })
            .andWhere('p.is_public = true');

        return this.renderResult<ProductCard>(qb, queries, ProductCard);
    }
}
