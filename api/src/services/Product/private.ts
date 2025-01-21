import { DeleteResult, UpdateResult } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { FOLDER_TYPES } from '@services/FS';
import { PaginationResult } from '@dto/Pagination';
import ProductService from '.';
import { QueriesProductList } from '@dto/Queries';
import { ProductEntity } from '@entities/Product';
import { ProductI } from '@interfaces/Product';
import { ProductCreateDTO, Product, ProductPreview, ProductUpdateDTO } from '@dto/Product/private';

@Injectable()
export default class ProductPrivateService extends ProductService {
    public async createProduct(newProduct: ProductCreateDTO, images: Express.Multer.File[]): Promise<ProductEntity> {
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

    public async getProduct(id: ProductI['id']): Promise<ProductEntity> {
        const qb = this.getProductQueryBulder().andWhere('p.id = :id', { id }).addSelect('p.orderCount');

        try {
            return await qb.getOneOrFail();
        } catch (_) {
            throw new NotFoundException('product not found');
        }
    }

    public async getProductList(q: QueriesProductList): Promise<PaginationResult<ProductPreview>> {
        const [res, count] = await this.productRepo.findAndCount({
            where: { category: { id: q.optionsFilter?.category[0] } },
            relations: { images: true },
            take: q.portion,
            skip: q.portion * (q.page - 1),
        });

        return new PaginationResult<ProductPreview>(
            res.map(i => new ProductPreview(i)),
            {
                currentPage: q.page,
                totalCount: count,
                itemPortion: q.portion,
            },
        );
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
