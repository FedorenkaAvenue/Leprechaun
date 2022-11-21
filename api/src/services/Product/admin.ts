import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { CreateProductDTO } from '@dto/Product';
import { FOLDER_TYPES } from '@services/FS';
import { CookiesI } from '@interfaces/Cookies';
import { SearchReqQueriesI } from '@interfaces/Queries';
import { PaginationResultDTO } from '@dto/Pagination';
import { ProductI } from '@interfaces/Product';
import { Product } from '@dto/Product/constructor';
import ProductHelperService from './helper';
import { PRODUCT_RELATIONS } from '@constants/relations';

@Injectable()
export default class ProductAdminService extends ProductHelperService {
    async createProduct(newProduct: CreateProductDTO, images: Express.Multer.File[]): Promise<void> {
        const { id } = await this.productRepo.save(new Product(newProduct));

        if (images) {
            const uploadedImgArr = await this.FSService.saveFiles(FOLDER_TYPES.PRODUCT, id, images);

            this.imageService.addImageArr(id, uploadedImgArr);
        }
    }

    async getAdminProduct(productId: ProductI['id']): Promise<ProductI> {
        return this.productRepo.findOne({
            where: { id: productId },
            relations: PRODUCT_RELATIONS,
        });
    }

    async getAdminProducts(queries: SearchReqQueriesI, params: CookiesI): Promise<PaginationResultDTO<ProductI>> {
        const qb = this.getProductQueryBulder();

        qb.leftJoinAndSelect('product.category', 'category');

        return this.renderResult<ProductI>(qb, queries, params);
    }

    async getCategoryAdminProducts(
        categoryUrl: string,
        queries: SearchReqQueriesI,
        params: CookiesI,
    ): Promise<PaginationResultDTO<ProductI>> {
        const qb = this.getProductQueryBulder();

        qb.innerJoin('product.category', 'category').where('category.url = :categoryUrl', { categoryUrl });

        return this.renderResult<ProductI>(qb, queries, params);
    }

    async deleteProduct(productId: string): Promise<DeleteResult> {
        const res = await this.productRepo.delete({ id: productId });

        this.FSService.removeFolder(FOLDER_TYPES.PRODUCT, productId);

        return res;
    }
}
