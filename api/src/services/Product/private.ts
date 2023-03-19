import { DeleteResult } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDTO } from '@dto/Product';
import { FOLDER_TYPES } from '@services/FS';
import { PaginationResult } from '@dto/Pagination/constructor';
import { ProductI } from '@interfaces/Product';
import { Product } from '@dto/Product/constructor';
import ProductService from '.';
import { QueriesProductList } from '@dto/Queries/constructor';
import { ProductEntity } from '@entities/Product';

@Injectable()
export default class ProductPrivateService extends ProductService {
    async createProduct(newProduct: CreateProductDTO, images: Express.Multer.File[]): Promise<void> {
        const { id } = await this.productRepo.save(new Product(newProduct));

        if (images) {
            const uploadedImgArr = await this.FSService.saveFiles(FOLDER_TYPES.PRODUCT, id, images);

            this.imageService.addImageArr(id, uploadedImgArr);
        }
    }

    async getProduct(id: ProductI['id']): Promise<ProductEntity> {
        const qb = this.getProductQueryBulder().andWhere('p.id = :id', { id });

        try {
            return await qb.getOneOrFail();
        } catch (_) {
            throw new NotFoundException('product not found');
        }
    }

    async getProductList(searchParams: QueriesProductList): Promise<PaginationResult<ProductEntity>> {
        const qb = this.getProductQueryBulder();

        return this.renderProductList<ProductEntity>(qb, searchParams);
    }

    async getCategoryProducts(
        categoryUrl: string,
        searchParams: QueriesProductList,
    ): Promise<PaginationResult<ProductEntity>> {
        const qb = this.getProductQueryBulder()
            .innerJoin('p.category', 'category')
            .where('category.url = :categoryUrl', { categoryUrl });

        return this.renderProductList<ProductEntity>(qb, searchParams);
    }

    async deleteProduct(productId: string): Promise<DeleteResult> {
        const res = await this.productRepo.delete({ id: productId });

        this.FSService.removeFolder(FOLDER_TYPES.PRODUCT, productId);

        return res;
    }
}
