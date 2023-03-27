import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Image } from '@dto/Image/constructor';
import { ImageEntity } from '@entities/Image';

@Injectable()
export class ImageService {
    constructor(@InjectRepository(ImageEntity) private readonly imageRepo: Repository<ImageEntity>) {}

    /**
     * @description save one image to DB
     * @returns promise of saved result
     */
    private async addImage(img: Image): Promise<ImageEntity> {
        return this.imageRepo.save(img);
    }

    /**
     * @description save array of images
     * @param productId product id
     * @param imgArr array of image ulrs
     */
    public async addImageArr(productId: string, imgArr: string[]): Promise<void> {
        try {
            await Promise.all(imgArr.map(imgUrl => this.addImage(new Image(productId, imgUrl))));
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
