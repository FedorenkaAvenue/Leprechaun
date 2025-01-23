import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { FOLDER_TYPES } from '@services/FS';
import { PaginationResult } from '@dto/Pagination';
import ProductService from '.';
import { ProductI, ProductPreviewI } from '@interfaces/Product';
import { ProductCreateDTO, Product, ProductPreview, ProductUpdateDTO } from '@dto/Product/private';
import { QueriesProductListI } from '@interfaces/Queries';

@Injectable()
export default class ProductPrivateService extends ProductService {
    public async createProduct(newProduct: ProductCreateDTO, images: Express.Multer.File[]): Promise<ProductI> {
        const createdProduct = await this.productRepo.save(new Product(newProduct));

        const {
            id,
            title: { id: _titleID, ...titles },
            description: { id: _descID, ...descriptions },
        } = createdProduct;

        if (images) {
            const uploadedImgArr = await this.FSService.saveFiles(FOLDER_TYPES.PRODUCT, id, images);

            this.imageService.addImageArr(id, uploadedImgArr);
        }

        return createdProduct;
    }

    public async getProduct(id: ProductI['id']): Promise<ProductI | null> {
        return await this.getProductQueryBulder()
            .andWhere('p.id = :id', { id })
            .addSelect('p.orderCount')
            .getOne();
    }

    public async getProductList(searchParams: QueriesProductListI): Promise<PaginationResult<ProductPreviewI>> {
        const qb = this.getProductQueryBulder();

        return this.renderProductList<ProductPreview>(qb, searchParams, false, ProductPreview);
    }

    public async updateProduct(productId: ProductI['id'], updates: ProductUpdateDTO): Promise<void> {
        try {
            this.productRepo.save({ id: productId, ...updates }); // ! should use 'save' instead of update
        } catch (err) {
            console.log(`while updating product: ${err}`);
        }
    }

    public async deleteProduct(productId: string): Promise<DeleteResult> {
        const res = await this.productRepo.delete({ id: productId });

        this.FSService.removeFolder(FOLDER_TYPES.PRODUCT, productId);

        return res;
    }
}
