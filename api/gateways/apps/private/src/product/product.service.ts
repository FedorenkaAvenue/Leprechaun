import { DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product, ProductCreateDTO, ProductPreview, ProductUpdateDTO } from './product.dto';
import { ProductI, ProductPreviewI } from '@core/product/product.interface';
import { ProductEntity } from '@core/product/product.entity';
import { FOLDER_TYPES } from '@core/FS/FS.enum';
import { QueriesProductListI } from '@core/queries/queries.interface';
import ProductCoreService from '@core/product/product.service';
import FSService from '@core/FS/FS.service';
import ImageService from '@core/image/image.service';
import { PaginationResult } from '@shared/dto/pagination.dto';

@Injectable()
export default class ProductService {
    constructor(
        @InjectRepository(ProductEntity) protected readonly productRepo: Repository<ProductEntity>,
        private readonly imageService: ImageService,
        private readonly FSService: FSService,
        private readonly productCoreService: ProductCoreService,
    ) { }

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
        return await this.productCoreService.getProductQueryBulder()
            .andWhere('p.id = :id', { id })
            .addSelect('p.orderCount')
            .getOne();
    }

    public async getProductList(searchParams: QueriesProductListI): Promise<PaginationResult<ProductPreviewI>> {
        const qb = this.productCoreService.getProductQueryBulder();

        return this.productCoreService.renderProductList<ProductPreview>(qb, searchParams, false, ProductPreview);
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
