import { Injectable } from '@nestjs/common';

import ProductService from '.';
import WishlistItemEntity from '@entities/WishlistItem';
import { ProductCardPublicI, ProductI, ProductPublicI } from '@interfaces/Product';
import { ProductCardPublic, ProductPublic } from '@dto/Product/public';
import { QueriesProductListI } from '@interfaces/Queries';
import { PaginationIResultI } from '@interfaces/Pagination';

@Injectable()
export default class ProductPublicService extends ProductService {
    public async getProduct(id: ProductI['id'], searchParams: QueriesProductListI): Promise<ProductPublicI | null> {
        const product = await this.getProductQueryBulder()
            .where('p.is_public = true')
            .andWhere('p.id = :id', { id })
            .leftJoinAndMapMany('p.wishlistCount', WishlistItemEntity, 'w', 'w.product.id = p.id')
            .leftJoinAndSelect('p.description', 'desc')
            .leftJoinAndSelect('p.category', 'cat')
            .leftJoinAndSelect('cat.title', 'cat_title')
            .getOne();

        if (!product) return null;

        return new ProductPublic(product, searchParams);
    }

    public async getProductList(searchParams: QueriesProductListI): Promise<PaginationIResultI<ProductCardPublicI>> {
        const qb = this.getProductQueryBulder().where('p.is_public = true');

        return this.renderProductList<ProductCardPublic>(qb, searchParams, true, ProductCardPublic);
    }
}
