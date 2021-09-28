import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateImageDTO } from '@dto/Image';
import { ImageEntity } from '@entities/Image';

@Injectable()
export class ImageService {
    constructor(
		@InjectRepository(ImageEntity) private readonly imageRepo: Repository<ImageEntity>
	) {}

	/**
	 * @description save one image to DB
	 * @param productId product ID
	 * @param imgUrl image url
	 * @returns promise of saved result
	 */
	addImage(imageDTO: CreateImageDTO): Promise<ImageEntity> {
		return this.imageRepo.save(imageDTO);
	}

	/**
	 * @description save array of images
	 * @param productId product id
	 * @param imgArr array of image ulrs
	 */
	async addImageArr(productId: string, imgArr: Array<string>): Promise<void> {
		try {
			await Promise.all(imgArr.map(imgUrl => this.addImage(new CreateImageDTO(productId, imgUrl))));
		} catch(err) {
			throw new InternalServerErrorException();
		}
	}
}
