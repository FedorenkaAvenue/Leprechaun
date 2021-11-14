import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CreatePropertyDTO, CreateFilterDTOConstructor } from '@dto/Property';
import { PropertyEntity } from '@entities/Property';
import { IProperty } from '@interfaces/Property';

@Injectable()
export class PropertyService {
    constructor(
		@InjectRepository(PropertyEntity) private readonly propertyRepo: Repository<PropertyEntity>
	) {}

	async createProperty(property: CreatePropertyDTO): Promise<void> {
		await this.propertyRepo.save(new CreateFilterDTOConstructor(property));
	}

	getProperty(propertyId: number): Promise<IProperty> {
		return this.propertyRepo.findOne({
			where: { id: propertyId },
			relations: [ 'property_group' ]
		});
	}

	deleteProperty(propertyId): Promise<DeleteResult> {
		return this.propertyRepo.delete({ id: propertyId });
	}
}
