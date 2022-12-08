import { Injectable } from '@nestjs/common';

import { PaginationResultDTO } from '@dto/Pagination';
import { ProductI } from '@interfaces/Product';
import { ProductCard, ProductPublic } from '@dto/Product/constructor';
import ProductService from '.';
import { QueriesProductList } from '@dto/Queries/constructor';

@Injectable()
export default class ProductPublicService extends ProductService {
    async getProduct(productId: ProductI['id'], searchParams: QueriesProductList): Promise<ProductPublic> {
        return new ProductPublic(await this.getProductById(productId), searchParams);
    }

    async getProductList(searchParams: QueriesProductList): Promise<PaginationResultDTO<ProductCard>> {
        const qb = this.getProductQueryBulder();

        qb.leftJoinAndSelect('product.category', 'category').where('product.is_public = true');

        return this.renderResult<ProductCard>(qb, searchParams, ProductCard);
    }

    async getCategoryProducts(
        categoryUrl: string,
        queries: QueriesProductList,
    ): Promise<PaginationResultDTO<ProductCard>> {
        const qb = this.getProductQueryBulder();

        qb.innerJoin('product.category', 'category')
            .where('category.url = :categoryUrl', { categoryUrl })
            .andWhere('product.is_public = true');

        return this.renderResult<ProductCard>(qb, queries, ProductCard);
    }
}
