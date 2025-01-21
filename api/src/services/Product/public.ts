import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResult } from '@dto/Pagination';
import ProductService from '.';
import { QueriesProductList } from '@dto/Queries';
import WishlistItemEntity from '@entities/WishlistItem';
import { ProductI } from '@interfaces/Product';
import { ProductCardPublic, ProductPublic } from '@dto/Product/public';

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

    public async getProductList(searchParams: QueriesProductList): Promise<PaginationResult<ProductCardPublic>> {
        const qb = this.getProductQueryBulder().where('p.is_public = true');

        return this.renderProductList<ProductCardPublic>(qb, searchParams, ProductCardPublic);
    }
}
