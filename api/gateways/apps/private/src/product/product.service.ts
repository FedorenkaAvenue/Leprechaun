import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product, ProductCreateDTO, ProductPreview, ProductUpdateDTO } from './product.dto';
import { ProductI, ProductPreviewI } from '@core/product/product.interface';
import { ProductEntity } from '@core/product/product.entity';
import { QueriesProductListI } from '@core/queries/queries.interface';
import ProductCoreService from '@core/product/product.service';
import ProductImageService from '@core/productImage/productImage.service';
import { PaginationResult } from '@shared/dto/pagination.dto';

@Injectable()
export default class ProductService {
    constructor(
        @InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
        private readonly productImageService: ProductImageService,
        private readonly productCoreService: ProductCoreService,
    ) { }

    public async createProduct(newProduct: ProductCreateDTO, images: Express.Multer.File[]): Promise<ProductI> {
        const createdProduct = await this.productRepo.save(new Product(newProduct));

        if (images.length) await this.productImageService.addImages(createdProduct.id, images);

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
        await this.productRepo.save({ id: productId, ...updates }); // ! should use 'save' instead of update
    }

    public async deleteProduct(productId: string): Promise<void> {
        const product = await this.productRepo.findOne({
            where: { id: productId },
            relations: { images: true },
            select: { images: { src_id: true, id: true } },
        });

        if (!product) throw new NotFoundException(`product with ID ${productId} not found`);

        await Promise.all([
            this.productRepo.remove(product),
            this.productImageService.removeImages(product.images),
        ]);
    }
}
