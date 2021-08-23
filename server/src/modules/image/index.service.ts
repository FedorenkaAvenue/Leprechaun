import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateImageDTO } from "./index.dto";
import { ImageEntity } from "./index.entity";

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
	addImage(productId: string, imgUrl: string): Promise<ImageEntity> {
		return this.imageRepo.save(new CreateImageDTO(productId, imgUrl));
	}

	/**
	 * @description save array of images
	 * @param productId product id
	 * @param imgArr array of image ulrs
	 * @returns promise with result
	 */
	async addImageArr(productId: string, imgArr: Array<string>): Promise<void> {
		try {
			await Promise.all(imgArr.map(imgUrl => this.addImage(productId, imgUrl)));
		} catch(err) {
			throw new InternalServerErrorException();
		}
	}
}
