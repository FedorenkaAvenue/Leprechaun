import { Injectable } from '@nestjs/common';

import { QueriesProductT } from '@interfaces/Queries';
import { PaginationResultDTO } from '@dto/Pagination';
import { ProductI } from '@interfaces/Product';
import { ProductCard, ProductPublic } from '@dto/Product/constructor';
import ProductService from '.';

@Injectable()
export default class ProductPublicService extends ProductService {
    async getProduct(productId: ProductI['id']): Promise<ProductPublic> {
        return new ProductPublic(await this.getProductById(productId));
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
