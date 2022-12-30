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

        qb.leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('category.title', 'category_title')
            .where('product.is_public = true')
            .andWhere('product.id = :id', { id })
            .leftJoinAndMapMany('product.wishlistCount', WishlistItemEntity, 'w', 'w.product.id = product.id');
        try {
            return new ProductPublic(await qb.getOneOrFail(), searchParams);
        } catch (_) {
            throw new NotFoundException('product not found');
        }
    }

    async getProductList(searchParams: QueriesProductList): Promise<PaginationResultDTO<ProductCard>> {
        const qb = this.getProductQueryBulder();

        qb.leftJoinAndSelect('product.category', 'category')
            .where('product.is_public = true')
            .andWhere('propertygroup.is_primary = true');

        return this.renderResult<ProductCard>(qb, searchParams, ProductCard);
    }

    async getCategoryProducts(
        categoryUrl: CategoryI['url'],
        queries: QueriesProductList,
    ): Promise<PaginationResultDTO<ProductCard>> {
        const qb = this.getProductQueryBulder();

        qb.innerJoin('product.category', 'category')
            .where('category.url = :categoryUrl', { categoryUrl })
            .andWhere('product.is_public = true');

        return this.renderResult<ProductCard>(qb, queries, ProductCard);
    }
}
