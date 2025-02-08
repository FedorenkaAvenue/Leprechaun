import { Injectable } from '@nestjs/common';

import { ProductCardPublic, ProductPublic } from './product.dto';
import { ProductCardPublicI, ProductPublicI } from './product.interface';
import { QueriesProductListI } from '@core/queries/queries.interface';
import WishlistItemEntity from '@core/wishlistItem/wishlistItem.entity';
import ProductCoreService from '@core/product/product.service';
import { ProductI } from '@core/product/product.interface';
import { PaginationIResultI } from '@shared/interfaces/pagination.interface';

@Injectable()
export default class ProductService {
    constructor(private readonly productCoreService: ProductCoreService) { }

    public async getProduct(id: ProductI['id'], searchParams: QueriesProductListI): Promise<ProductPublicI | null> {
        const product = await this.productCoreService.getProductQueryBulder()
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
        const qb = this.productCoreService.getProductQueryBulder();

        return this.productCoreService.renderProductList<ProductCardPublicI>(qb, searchParams, true, ProductCardPublic);
    }
}
