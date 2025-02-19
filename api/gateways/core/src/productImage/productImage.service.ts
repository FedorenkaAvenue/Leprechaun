import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ProductImageEntity from './productImage.entity';
import FSService from '../FS/FS.service';
import { FSBucket } from '../FS/FS.enum';

@Injectable()
export default class ProductImageService {
    constructor(
        @InjectRepository(ProductImageEntity) private readonly imageRepo: Repository<ProductImageEntity>,
        private readonly FSService: FSService,
    ) { }

    public async addImages(productId: string, imgArr: Express.Multer.File[]): Promise<void> {
        await Promise.all(imgArr.map(async (image, i) => {
            const { url, id } = await this.FSService.uploadFile(image, FSBucket.PRODUCT, productId);

            return this.imageRepo.save({
                product_id: productId,
                src: url,
                is_main: i === 0,
                src_id: id,
            });
        }));
    }

    public async removeImages(images: ProductImageEntity[]) {
        await Promise.all(images.map(image => {
            return this.FSService.deleteFile(FSBucket.PRODUCT, image.src_id);
        }));
    }
}
