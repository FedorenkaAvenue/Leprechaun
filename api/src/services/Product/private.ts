import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { CreateProductDTO } from '@dto/Product';
import { FOLDER_TYPES } from '@services/FS';
import { PaginationResultDTO } from '@dto/Pagination';
import { ProductI } from '@interfaces/Product';
import { Product } from '@dto/Product/constructor';
import ProductService from '.';
import { PRODUCT_RELATIONS } from '@constants/relations';
import { Queries } from '@dto/Queries/constructor';
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

    async getProduct(productId: ProductI['id']): Promise<ProductEntity> {
        return this.productRepo.findOne({
            where: { id: productId },
            relations: PRODUCT_RELATIONS,
        });
    }

    async getProductList(queries: Queries): Promise<PaginationResultDTO<ProductEntity>> {
        const qb = this.getProductQueryBulder();

        qb.leftJoinAndSelect('product.category', 'category');

        return this.renderResult<ProductEntity>(qb, queries);
    }

    async getCategoryProducts(categoryUrl: string, queries: Queries): Promise<PaginationResultDTO<ProductEntity>> {
        const qb = this.getProductQueryBulder();

        qb.innerJoin('product.category', 'category').where('category.url = :categoryUrl', { categoryUrl });

        return this.renderResult<ProductEntity>(qb, queries);
    }

    async deleteProduct(productId: string): Promise<DeleteResult> {
        const res = await this.productRepo.delete({ id: productId });

        this.FSService.removeFolder(FOLDER_TYPES.PRODUCT, productId);

        return res;
    }
}
