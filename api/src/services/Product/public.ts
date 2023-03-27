import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResult } from '@dto/Pagination/constructor';
import { ProductI } from '@interfaces/Product';
import { ProductCard, ProductPublic } from '@dto/Product/constructor';
import ProductService from '.';
import { QueriesProductList } from '@dto/Queries/constructor';
import WishlistItemEntity from '@entities/WishlistItem';
import { CategoryI } from '@interfaces/Category';

@Injectable()
export default class ProductPublicService extends ProductService {
    public async getProduct(id: ProductI['id'], searchParams: QueriesProductList): Promise<ProductPublic> {
        const qb = this.getProductQueryBulder()
            .where('p.is_public = true')
            .andWhere('p.id = :id', { id })
            .leftJoinAndMapMany('p.wishlistCount', WishlistItemEntity, 'w', 'w.product.id = p.id')
            .leftJoinAndSelect('p.description', 'desc')
            .leftJoinAndSelect('p.category', 'cat')
            .leftJoinAndSelect('cat.title', 'cat_title');
        try {
            return new ProductPublic(await qb.getOneOrFail(), searchParams);
        } catch (_) {
            throw new NotFoundException('product not found');
        }
    }

    public async getProductList(searchParams: QueriesProductList): Promise<PaginationResult<ProductCard>> {
        const qb = this.getProductQueryBulder().where('p.is_public = true');

        return this.renderProductList<ProductCard>(qb, searchParams, ProductCard);
    }

    public async getCategoryProducts(
        categoryUrl: CategoryI['url'],
        searchParams: QueriesProductList,
    ): Promise<PaginationResult<ProductCard>> {
        const qb = this.getProductQueryBulder()
            .leftJoin('p.category', 'cat')
            .where('cat.url = :categoryUrl', { categoryUrl })
            .andWhere('p.is_public = true');

        return this.renderProductList<ProductCard>(qb, searchParams, ProductCard);
    }
}
