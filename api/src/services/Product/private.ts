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
import { SEProductI } from '@interfaces/SE';
import { SEIndexesE } from '@enums/SE';

@Injectable()
export default class ProductPrivateService extends ProductService {
    public async createProduct(newProduct: CreateProductDTO, images: Express.Multer.File[]): Promise<ProductEntity> {
        const createdProduct = await this.productRepo.save(new Product(newProduct));
        
        const {
            id,
            title: { id: _titleID, ...titles },
            description: { id: _descID, ...descriptions }
        } = createdProduct;

        if (images) {
            const uploadedImgArr = await this.FSService.saveFiles(FOLDER_TYPES.PRODUCT, id, images);

            this.imageService.addImageArr(id, uploadedImgArr);
        }

        this.SEService.SE.index<SEProductI>({
            index: SEIndexesE.PRODUCT,
            document: {
                id,
                title: titles,
                description: descriptions,
            }
        });

        return createdProduct;
    }

    public async getProduct(id: ProductI['id']): Promise<ProductEntity> {
        const qb = this.getProductQueryBulder().andWhere('p.id = :id', { id });

        try {
            return await qb.getOneOrFail();
        } catch (_) {
            throw new NotFoundException('product not found');
        }
    }

    public async getProductList(searchParams: QueriesProductList): Promise<PaginationResult<ProductEntity>> {
        const qb = this.getProductQueryBulder();

        return this.renderProductList<ProductEntity>(qb, searchParams);
    }

    public async getCategoryProducts(
        categoryUrl: string,
        searchParams: QueriesProductList,
    ): Promise<PaginationResult<ProductEntity>> {
        const qb = this.getProductQueryBulder()
            .innerJoin('p.category', 'category')
            .where('category.url = :categoryUrl', { categoryUrl });

        return this.renderProductList<ProductEntity>(qb, searchParams);
    }

    public async deleteProduct(productId: string): Promise<DeleteResult> {
        const res = await this.productRepo.delete({ id: productId });

        this.FSService.removeFolder(FOLDER_TYPES.PRODUCT, productId);

        return res;
    }
}
